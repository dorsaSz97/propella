import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/libs';
import prisma from '@/app/libs/client';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Couldnt get the current user');

    const updatedFavoriteIds = [...(currentUser.favoriteIds || [])];

    updatedFavoriteIds.push(params.id);

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });

    return NextResponse.json({ data: updatedUser });
  } catch (error: any) {
    console.log('error is:' + error);

    // creates a Response object ({ok: , status: , type: , ....}) associated with the network error (ex. the type prop would be 'error')
    return NextResponse.error();
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Couldnt get the current user');

    const updatedFavoriteIds = [...(currentUser.favoriteIds || [])];

    const unfavoritedIndex = updatedFavoriteIds.findIndex(
      id => id === params.id
    );
    if (unfavoritedIndex === -1)
      throw new Error('Unfavorited property not found');

    updatedFavoriteIds.splice(unfavoritedIndex, 1);

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });

    return NextResponse.json({ data: updatedUser });
  } catch (error: any) {
    console.log('error is:' + error);
    return NextResponse.error();
  }
}
