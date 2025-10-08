import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import sgMail from '@sendgrid/mail';
import rateLimiter from '@/lib/rate-limiter';

const limiter = rateLimiter({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 unique IPs per interval
});

export async function POST(request: NextRequest) {
  try {
    // Get the user's IP address from the request headers.
    // 'x-forwarded-for' is a standard header for identifying the originating IP address.
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    await limiter.check(5, ip); // 5 requests per minute per IP

    const body = await request.json();
    const { name, email, message, subject, honeypot } = body;

    // 1. Honeypot validation for spam mitigation
    if (honeypot) {
      // This is likely a bot. Respond with success but do nothing.
      return NextResponse.json({ message: 'Message received!' });
    }

    // 2. Server-side validation of required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // 3. Store submission in the database
    const client = await clientPromise;
    const db = client.db(); // Use your default database

    const submission = {
      name,
      email,
      subject: subject || 'No Subject', // Provide a default for optional field
      message,
      read: false, // Default status is 'unread'
      createdAt: new Date(), // Timestamp
    };

    await db.collection('submissions').insertOne(submission);

    // 4. Send an email notification using SendGrid
    if (process.env.SENDGRID_API_KEY && process.env.ADMIN_EMAIL_RECIPIENT) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: process.env.ADMIN_EMAIL_RECIPIENT,
        from: 'no-reply@yourdomain.com', // Use a verified sender from your SendGrid account
        subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
        html: `
          <h2>New Submission from your website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      };

      await sgMail.send(msg);
    }

    // 5. Return a success response
    return NextResponse.json({
      message: 'Thank you for your message! We will get back to you soon.',
    });
  } catch (error) {
    // If the error is undefined, it's likely the rate limiter rejection.
    if (error === undefined) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    // Handle all other errors
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}