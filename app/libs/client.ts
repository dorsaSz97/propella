// Nextjs supports hot reloading of changed files, which means it enables us to see the changes we made without restarting. if this action refreshes the module responsible for creating the PrismaClient, additional unwanted instances of it would be made in the dev environment
// thats why we make it a global var (global vars wont be reloaded)
import { PrismaClient } from '@prisma/client';

// we are saying, we dont really know the exact type of the global object (unknown which is more flexible than any) but it should be casted as an object with prisma prop (after as, should be a type definition)
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
