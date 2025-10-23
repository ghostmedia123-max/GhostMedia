import {getToken} from 'next-auth/jwt'
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export async function middleware(req: NextRequest) {
  // Get the token from the request
  const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET})

  // If the user is trying to access /admin and there's no token
  if (!token) {
    const url = req.nextUrl.clone()
    url.pathname = '/api/auth/signin'
    url.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // If the user is authenticated, allow the request to proceed
  return NextResponse.next()
}

export const config = {
  // Protect the /admin route
  matcher: ['/admin'],
}