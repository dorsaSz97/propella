import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/libs/client";
import { Reservation, User } from "@prisma/client";

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    // if(!session || !session.user || !session.user.email)
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
}

export const getProperties = async () => {
  try {
    const properties = await prisma.property.findMany();
    console.log(properties);
    return properties;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const getSelectedProperty = async (id: string) => {
  try {
    const selectedProperty = await prisma.property.findUnique({
      where: {
        id,
      },
    });
    if (!selectedProperty) return null;

    return selectedProperty;
  } catch (error: any) {
    return null;
  }
};

export const getFavorites = async (user: User) => {
  try {
    const favorites = await prisma.property.findMany({
      where: {
        id: {
          in: [...user.favoriteIds],
        },
      },
    });

    return favorites;
  } catch (error: any) {
    return null;
  }
};

export const getYourHomes = async (user: User) => {
  try {
    const homes = await prisma.property.findMany({
      where: {
        hostId: user.id,
      },
    });

    return homes;
  } catch (error: any) {
    return null;
  }
};

export const getReservations = async (user: User) => {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        guestId: user.id,
      },
    });

    return reservations;
  } catch (error: any) {
    return null;
  }
};

export const getReservationDetail = async (res: Reservation) => {
  try {
    const relListing = await prisma.property.findUnique({
      where: {
        id: res.propertyId,
      },
    });
    if (!relListing) return null;

    return relListing;
  } catch (error: any) {
    return null;
  }
};
