import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Propella',
  description: 'Real Estate Listings',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
