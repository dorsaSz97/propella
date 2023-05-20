import './globals.css';
import { Poppins } from 'next/font/google';

import Image from 'next/image';

import countries from 'world-countries';
import { DateRangePicker, Range } from 'react-date-range';

import { RxPerson } from 'react-icons/rx';
import { RiSearchLine } from 'react-icons/ri';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { IoMapOutline } from 'react-icons/io5';
import { BsCalendar2Date } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { VscListFlat } from 'react-icons/vsc';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

const poppins = Poppins({
  weight: ['400', '600', '700', '800', '900'], // regular, bold, semibold
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
      <body className={`text-text-dark font-poppins `}>
        {/* navigation */}
        {/* <header className="flex justify-between items-center px-5 py-3">
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
        </header> */}

        {children}
      </body>
    </html>
  );
}
