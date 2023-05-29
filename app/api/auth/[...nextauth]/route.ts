import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/app/libs/client';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  // the connection tool between our app and the database services (ex. mongoDB)
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      // we know it exists (otherwise couldve used ?? '' OR as string)
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    // handles signing in with arbitrary credentials
    // if the credentials are valid, returns => an object representing a user
    // if the credentials are invalid returns => false|null
    CredentialsProvider({
      name: 'Credentials', // this name is the one we write when we call the signIn fn (in there, should be all lowercased)
      credentials: {
        // the blueprint of the credentials object that later on should be submitted for authorizing
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      // this callback fn is for when we want to authorize the user and gets executed when we call this: (signIn('credentials'), {credentials})
      // takes the submitted credentials (with the same properties and more but the assigned values are string|null)
      async authorize(credentials) {
        const enteredEmail = credentials?.email;
        const enteredPass = credentials?.password;

        if (enteredEmail && enteredPass) {
          // finding a user with the same email (could be 0 => null)
          const user = await prisma.user.findUnique({
            where: {
              email: enteredEmail,
            },
          });

          if (user && user.hashedPassword) {
            // encrypts the password value in the credentials whilst signing in and compares it to the hashedPassword in the database that was created at the time of signing up
            const isPassCorrect = await bcrypt.compare(
              credentials.password,
              user.hashedPassword
            );

            if (isPassCorrect) {
              return user;
            } else {
              throw new Error('Wrong password!');
            }
          } else {
            throw new Error('No user found with these information');
          }
        } else {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],

  // pages: {
  //   signIn: '/getting-started?type=login', // url of the login page
  // },
  // debug: process.env.NODE_ENV === 'development',

  session: {
    strategy: 'jwt', // session information will be stored and transmitted as a JWT
    // by default having an adapter makes it to be 'database' but it was giving deleteSession error
  },

  // an important security measure to protect user authentication and session-related information
  // for signing and encrypting session cookies and other sensitive data so that the Nextauth generated tokens and session cookies be more secure against attacks
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
