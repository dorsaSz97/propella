import { NextResponse } from 'next/server';
import prisma from '@/app/libs/client';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.password)
      throw new Error('Couldnt get the data properly');

    const userExists = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (userExists) throw new Error('A user with this email already exists');

    // changing up the original password for security reasons
    const hashedPassword = await bcrypt.hash(body.password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        hashedPassword,
      },
    });

    return NextResponse.json({ user: newUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
