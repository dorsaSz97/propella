import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/libs";
import prisma from "@/app/libs/client";
import { FormValues, ImageType } from "@/app/types";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("Couldnt get the current user");

    const body = await req.json();
    Object.keys(body).forEach((k) => {
      if (!body[k]) throw new Error("Couldnt get the data properly");
    });

    const {
      images,
      title,
      country,
      description,
      options,
      allowedGuests,
      price,
      address,
      availableDates,
    }: FormValues = body;

    const newProperty = await prisma.property.create({
      data: {
        hostId: currentUser.id,
        images: [
          images.find((img) => img.type === ImageType.Main)!.url,
          images.find((img) => img.type === ImageType.Kitchen)!.url,
          images.find((img) => img.type === ImageType.Bathroom)!.url,
          images.find((img) => img.type === ImageType.Bedroom)!.url,
        ],
        title,
        country,
        description,
        options,
        allowedGuests,
        price,
        address,
        availableDates,
      },
    });

    return NextResponse.json({ newProperty });
  } catch (error: any) {
    console.log("error is:" + error);

    return NextResponse.json({ error: error.message });
  }
}
