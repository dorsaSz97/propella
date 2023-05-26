import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from './pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import prisma from '@/app/libs/client';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest, response: NextResponse) {
  const token = await getToken({ req: request });

  if (token) {
    return NextResponse.redirect(new URL('/properties', request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/getting-started'],
};
