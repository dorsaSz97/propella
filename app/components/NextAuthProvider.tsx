'use client';

import { SessionProvider } from 'next-auth/react';

// this is needed to retrieve the session data in a client component (useSession hook)
const NextAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
