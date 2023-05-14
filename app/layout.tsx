// apply the styles to every route in our app
import './globals.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Poppins } from 'next/font/google';

import { RxPerson } from 'react-icons/rx';
import { RiSearchLine } from 'react-icons/ri';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsCalendar2Date } from 'react-icons/bs';

const poppins = Poppins({
  weight: ['400', '600', '700'], // regular, bold, semibold
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Propella',
  description: 'Real Estate Listings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className={`text-text-dark font-poppins px-5 py-3`}>
        {/* navigation */}
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

        {/* searchbox */}

        <div className="flex justify-center items-center mt-[-2rem]">
          <div className="flex">
            <div className="rounded-full h-35 w-35 bg-silverGrey p-2 btn--search">
              <button className="rounded-full h-25 w-25  p-5 text-lg">
                <HiOutlineLocationMarker />
              </button>
            </div>

            <div className="rounded-full h-35 w-35 bg-silverGrey p-2 btn--search">
              <button className="rounded-full h-25 w-25  p-5 text-lg">
                <BsCalendar2Date />
              </button>
            </div>

            <div className="rounded-full h-35 w-35 bg-silverGrey p-2 btn--search">
              <button className="rounded-full h-25 w-25  p-5 text-lg">
                <RxPerson />
              </button>
            </div>

            <div className="rounded-full h-35 w-35 bg-silverGrey p-2">
              <button className="rounded-full h-25 w-25 bg-grassGreen p-5 text-lg">
                <RiSearchLine color="white" />
              </button>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
