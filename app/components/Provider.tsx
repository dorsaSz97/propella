'use client';

import { ReactElement } from 'react';
import { SessionProvider } from 'next-auth/react';

const Provider = ({ children }: { children: ReactElement }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
