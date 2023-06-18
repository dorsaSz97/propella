import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // there will be a token if we are already signed in, otherwise its null
  const token = await getToken({ req: request });

  if (token) {
    if (request.nextUrl.pathname !== '/getting-started') {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/properties', request.url));
    }
  } else {
    if (request.nextUrl.pathname !== '/getting-started') {
      return NextResponse.redirect(
        new URL('/getting-started?type=login', request.url)
      );
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ['/getting-started'],
};
