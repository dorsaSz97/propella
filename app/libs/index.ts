import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/app/libs/client';

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
