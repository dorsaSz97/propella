import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export const metadata = {
  title: 'Propella',
  description: 'Real Estate Listings',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <>
      <header className="flex justify-between items-center px-5 py-3">
        <h1 className="font-bold text-head1 text-grassGreen">
          <a href="/">Propella</a>
        </h1>
        <div className="flex gap-4 items-center">
          <button className="border-grassGreen border-[1px] rounded-full px-6 py-1 text-body-lg">
            Login
          </button>
          <button className="border-grassGreen border-[1px] rounded-full px-6 py-1 text-body-lg bg-grassGreen text-white">
            Register
          </button>
        </div>
      </header>

      {children}
    </>
  );
}
