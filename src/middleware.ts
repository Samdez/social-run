import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // if (!sessionCookie) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile'], // Specify the routes the middleware applies to
}
