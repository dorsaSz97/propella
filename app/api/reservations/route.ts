import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/libs";
import prisma from "@/app/libs/client";

// cant have these fns in a client side file!
const getTotalDaysNum = (startDate: Date, endDate: Date) => {
  return (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24 + 1;
};

const getDatesArr = (startDate: Date, endDate: Date) => {
  const dates = [];
  const start = new Date(startDate); // dont wanna change anything about the original date param
  const end = new Date(endDate);

  while (start <= end) {
    dates.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }

  return dates;
};

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("Couldnt get the current user");

    const body = await req.json();
    Object.keys(body).forEach((k) => {
      if (!body[k]) throw new Error("Couldnt get the data properly");
    });

    const {
      propertyId,
      startDate,
      endDate,
      peopleStaying,
    }: {
      propertyId: string;
      startDate: string;
      endDate: string;
      peopleStaying: number;
    } = body; // data passed through req, is mostly string

    const selectedProperty = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    });
    if (!selectedProperty)
      throw new Error("The property you wanna reserve doesnt exist");

    const newAvailableDates = selectedProperty.availableDates.filter(
      (availableDate) => {
        return !getDatesArr(new Date(startDate), new Date(endDate))
          .map((date) => date.toDateString())
          .includes(availableDate.toDateString()); // converting to string cause two objects with the same value arent the same
      }
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
          getTotalDaysNum(new Date(startDate), new Date(endDate)) *
          selectedProperty.price,
      },
    });

    return NextResponse.json({ newReservation });
  } catch (error: any) {
    console.log("error is: " + error);

    return NextResponse.json({ error: error.message });
  }
}
