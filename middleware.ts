import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

// Middleware to protect routes
// This middleware checks if the user is authenticated by verifying the JWT token
// If the token is valid, it allows the request to proceed
// If the token is invalid or expired, it redirects the user to the login page

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const url = request.nextUrl

  if (!token) {
    return NextResponse.redirect(new URL('/login', url))
  }

  try {
    // verify token
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    return NextResponse.next()
  } catch (err) {
    // token invalid or expired
    return NextResponse.redirect(new URL('/login', url))
    console.log('Token verification failed:', err)
  }
}

export const config = {
  matcher: ['/Dashboard'],
}