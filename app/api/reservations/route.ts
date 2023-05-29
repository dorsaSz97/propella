import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/libs';
import prisma from '@/app/libs/client';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Couldnt get the current user');

    const { peopleStaying, endDate, startDate, propertyId } = await req.json();
    if (!propertyId || !startDate || !endDate || !peopleStaying) {
      throw new Error('Couldnt get the data properly');
    }

    const selectedProperty = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    });
    if (!selectedProperty)
      throw new Error('The property you wanna reserve doesnt exist');

    const newReservation = await prisma.reservation.create({
      data: {
        guestId: currentUser.id,
        startDate: startDate,
        endDate: endDate,
        propertyId: selectedProperty.id,
        peopleStaying,
        totalPrice: peopleStaying * selectedProperty.price,
      },
    });

    return NextResponse.json({ reservation: newReservation });
  } catch (error: any) {
    console.log('error is:' + error);
    NextResponse.error();
  }
}
