import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  // IMPORTANT: Use environment variables for credentials
  const expectedEmail = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (email === expectedEmail && password === expectedPassword) {
    // 1. Credentials are correct, create a session token.
    // For this project, a secure random string from env vars is the correct approach.
    const sessionToken = process.env.SESSION_TOKEN_SECRET;

    // Add a runtime check to ensure the session secret is configured.
    if (!sessionToken) {
      console.error('SESSION_TOKEN_SECRET is not set in environment variables.');
      return res.status(500).json({ message: 'Internal Server Error: Auth configuration missing.' });
    }

    // 2. Set the token in a secure, httpOnly cookie.
    // The token itself is not sensitive, but httpOnly is a crucial security best practice.
    const cookie = serialize('session-token', sessionToken, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
      maxAge: 60 * 60 * 24, // 1 day
      path: '/', // Cookie is available for all paths
    });

    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({ message: 'Login successful' });
  } else {
    // 3. Credentials are incorrect
    return res.status(401).json({ message: 'Invalid email or password' });
  }
}