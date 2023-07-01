import { NextResponse } from 'next/server';
import prisma from '@/app/libs/client';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    Object.keys(body).forEach(k => {
      if (!body[k]) throw new Error('Couldnt get the data properly');
    });

    const { name, email, password } = body;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) throw new Error('A user with this email already exists');

    // changing up the original password for security reasons
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json({ newUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
