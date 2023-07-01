import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // there will be a token if we are already signed in, otherwise its null
  const token = await getToken({ req: request });

  if (token) {
    return NextResponse.redirect(new URL('/properties', request.url));
  }
}

export const config = {
  matcher: ['/getting-started'],
};
