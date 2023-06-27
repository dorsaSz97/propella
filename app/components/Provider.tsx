'use client';

import { SessionProvider } from 'next-auth/react';

const Provider = ({ children }: { children: React.ReactElement }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;