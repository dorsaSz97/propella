import { NextResponse } from 'next/server';
import prisma from '@/app/libs/client';
import { getCurrentUser } from '@/app/libs';

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Couldnt get the current user');

    const canceledReservation = await prisma.reservation.deleteMany({
      where: { id: params.id, guestId: currentUser.id },
    });

    return NextResponse.json({ response: canceledReservation });
  } catch (error: any) {
    console.log('error is:' + error);

    return NextResponse.json({ error: error.message });
  }
}
