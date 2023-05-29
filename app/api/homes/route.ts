import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/libs';
import prisma from '@/app/libs/client';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Couldnt get the current user');

    const body = await req.json();
    Object.keys(body).forEach(k => {
      if (!body[k]) throw new Error('Couldnt get the data properly');
    });

    const {
      options,
      allowedGuests,
      images,
      country,
      price,
      title,
      address,
      availableDates,
      description,
    } = body;

    const newProperty = await prisma.property.create({
      data: {
        hostId: currentUser.id,
        title,
        description,
        price,
        country,
        address,
        allowedGuests,
        images,
        availableDates,
        options,
      },
    });

    return NextResponse.json({ home: newProperty });
  } catch (error: any) {
    console.log('error is:' + error);
    return NextResponse.error();
  }
}
