import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!, // we know it exists (otherwise couldve used ?? '' OR as string)
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/properties',
  },
  // generates secure session cookies
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// NextAuth.js needs the GET and POST handlers to function properly
export { handler as GET, handler as POST };
