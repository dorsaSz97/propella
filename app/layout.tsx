// apply the styles to every route in our app
import './globals.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Poppins } from 'next/font/google';
import Image from 'next/image';

import { RxPerson } from 'react-icons/rx';
import { RiSearchLine } from 'react-icons/ri';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsCalendar2Date } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';

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

        {/* lisings */}
        <div className="p-8">
          <ul className="grid grid-cols-5 ">
            <li>
              <div className="relative mb-[1rem]">
                <Image
                  src="/prop1.jpg"
                  alt="property"
                  width={150}
                  height={300}
                  className="rounded-[15%] object-cover"
                />
                <button className="absolute h-15 w-15 bg-silverGrey rounded-lg bg-opacity-25 top-5 right-5 z-[10]">
                  <AiOutlineHeart />
                </button>
              </div>
              <header className="flex justify-between items-center font-bold">
                <h3 className="capitalize">Wooden Apartment</h3>
                <span>155 $</span>
              </header>
              <p className="capitalize">Rome, Italy</p>
            </li>
            <li>
              <div className="relative mb-[1rem]">
                <Image
                  src="/prop2.jpg"
                  alt="property"
                  width={150}
                  height={300}
                  className="rounded-[15%] object-cover"
                />
                <button className="absolute h-15 w-15 bg-silverGrey rounded-lg bg-opacity-25 top-5 right-5 z-[10]">
                  <AiOutlineHeart />
                </button>
              </div>
              <header className="flex justify-between items-center font-bold">
                <h3>The Old Village Cottage</h3>
                <span>180 $</span>
              </header>
              <p>Dublin, Ireland</p>
            </li>
            <li>
              <div className="relative mb-[1rem]">
                <Image
                  src="/prop3.jpg"
                  alt="property"
                  width={150}
                  height={300}
                  className="rounded-[15%] object-cover"
                />
                <button className="absolute h-15 w-15 bg-silverGrey rounded-lg bg-opacity-25 top-5 right-5 z-[10]">
                  <AiOutlineHeart />
                </button>
              </div>
              <header className="flex justify-between items-center font-bold">
                <h3>Villa Casa Bella</h3>
                <span>235 $</span>
              </header>
              <p>Catania, Italy</p>
            </li>
            <li>
              <div className="relative mb-[1rem]">
                <Image
                  src="/prop4.jpg"
                  alt="property"
                  width={150}
                  height={300}
                  className="rounded-[15%] object-cover"
                />
                <button className="absolute h-15 w-15 bg-silverGrey rounded-lg bg-opacity-25 top-5 right-5 z-[10]">
                  <AiOutlineHeart />
                </button>
              </div>
              <header className="flex justify-between items-center font-bold">
                <h3>Zen Apartment</h3>
                <span>320 $</span>
              </header>
              <p>Tokyo, Japan</p>
            </li>
          </ul>
        </div>

        {children}
      </body>
    </html>
  );
}
