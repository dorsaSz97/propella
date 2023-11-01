import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/libs";
import prisma from "@/app/libs/client";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("Couldnt get the current user");

    const body = await req.json();
    Object.keys(body).forEach((k) => {
      if (!body[k]) throw new Error("Couldnt get the data properly");
    });

    const { propertyId, startDate, endDate, peopleStaying } = body;

    const selectedProperty = await prisma.property.findUnique({
      where: {
        id: propertyId,
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

    const newDates = selectedProperty.availableDates.filter(
      (date) =>
        !getDateArray(startDate, endDate)
          .map((d) => d.toDateString())
          .includes(date.toDateString())
    );

    await prisma.property.update({
      where: { id: selectedProperty.id },
      data: {
        availableDates: newDates,
      },
    });

    const stayingDays =
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        1000 /
        60 /
        60 /
        24 +
      1;

    const newReservation = await prisma.reservation.create({
      data: {
        propertyId: selectedProperty.id,
        guestId: currentUser.id,
        startDate: startDate,
        endDate: endDate,
        peopleStaying,
        totalPrice: stayingDays * selectedProperty.price,
      },
    });

    return NextResponse.json({ newReservation });
  } catch (error: any) {
    console.log("error is:" + error);

    return NextResponse.json({ error: error.message });
  }
}
