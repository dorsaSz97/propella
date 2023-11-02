import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/libs";
import prisma from "@/app/libs/client";
import { getDatesArr, getTotalDaysNum } from "@/app/libs/helpers";

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

    const newAvailableDates = selectedProperty.availableDates.filter(
      (availableDate) =>
        !getDatesArr(startDate, endDate)
          .map((date) => date.toDateString())
          .includes(availableDate.toDateString()) // converting to string cause two objects with the same value arent the same
    );
    await prisma.property.update({
      where: { id: selectedProperty.id },
      data: {
        availableDates: newAvailableDates,
      },
    });

    const newReservation = await prisma.reservation.create({
      data: {
        propertyId: selectedProperty.id,
        guestId: currentUser.id,
        startDate,
        endDate,
        peopleStaying,
        totalPrice:
          getTotalDaysNum(startDate, endDate) * selectedProperty.price,
      },
    });

    return NextResponse.json({ newReservation });
  } catch (error: any) {
    console.log("error is:" + error);

    return NextResponse.json({ error: error.message });
  }
}
