import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import prisma from '@/app/libs/client';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const signedInEmail = credentials?.email;
        const signedInPass = credentials?.password;

        if (signedInEmail && signedInPass) {
          // finding a user with the same email (could be 0 => null)
          const user = await prisma.user.findUnique({
            where: {
              email: signedInEmail,
            },
          });
          if (user) {
            // comparing hashedPassword in the database that was created at the time of signing up and the password value in the credentials whilst signing in

            const isPassCorrect = await bcrypt.compare(
              credentials.password,
              user.hashedPassword!
            );
            if (isPassCorrect) {
              return user;
            } else {
              throw new Error('Wrong password!');
            }
          } else {
            throw new Error('No user found with this email');
          }
        } else {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  pages: {
    signIn: '/getting-started?type=login',
  },
  // debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
