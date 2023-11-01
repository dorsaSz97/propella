import { NextResponse } from "next/server";
import prisma from "@/app/libs/client";
import { getCurrentUser } from "@/app/libs";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("Couldnt get the current user");

    const canceledReservation = await prisma.reservation.delete({
      where: { id: params.id },
    });

    const selectedProperty = await prisma.property.findUnique({
      where: {
        id: canceledReservation.propertyId,
      },
    });

    if (!selectedProperty)
      throw new Error("The property you wanna reserve doesnt exist");

    const getDateArray = function (start: Date, end: Date) {
      let arr = [];
      let curr = new Date(start);
      const endDate = new Date(end);

      while (curr <= endDate) {
        arr.push(new Date(curr));
        curr.setDate(curr.getDate() + 1);
      }

      return arr;
    };

    await prisma.property.update({
      where: { id: canceledReservation.propertyId },
      data: {
        availableDates: [
          ...selectedProperty.availableDates,
          ...getDateArray(
            canceledReservation.startDate,
            canceledReservation.endDate
          ),
        ],
      },
    });

    return NextResponse.json({ response: canceledReservation });
  } catch (error: any) {
    console.log("error is:" + error);

    return NextResponse.json({ error: error.message });
  }
}
