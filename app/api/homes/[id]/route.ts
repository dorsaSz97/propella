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

    const deletedProperty = await prisma.property.deleteMany({
      where: { id: params.id, hostId: currentUser.id },
    });

    return NextResponse.json({ data: deletedProperty });
  } catch (error: any) {
    console.log('error is:' + error);
    return NextResponse.error();
  }
}
