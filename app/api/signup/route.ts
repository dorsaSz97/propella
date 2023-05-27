import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/app/libs/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // changing up the original password for security reasons
    const hashedPassword = await bcrypt.hash(password, 12);

    // creating a new user in the DB
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    return NextResponse.json({ user: newUser });
  } catch (error: any) {
    return NextResponse.error();
  }
}
