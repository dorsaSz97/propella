import { NextResponse } from 'next/server';
import prisma from '@/app/libs/client';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password)
      throw new Error('Couldnt get the data properly');

    // changing up the original password for security reasons
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json({ user: newUser });
  } catch (error: any) {
    console.log('error is:' + error);
    return NextResponse.error();
  }
}
