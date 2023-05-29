import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/libs';
import prisma from '@/app/libs/client';

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

    return NextResponse.json({ data: canceledReservation });
  } catch (error: any) {
    console.log('error is:' + error);
    return NextResponse.error();
  }
}
