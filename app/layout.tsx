'use client';

// apply the styles to every route in our app
import './globals.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Poppins } from 'next/font/google';
import Image from 'next/image';

import countries from 'world-countries';

import { RxPerson } from 'react-icons/rx';
import { RiSearchLine } from 'react-icons/ri';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsCalendar2Date } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { ChangeEvent, useState } from 'react';

const poppins = Poppins({
  weight: ['400', '600', '700'], // regular, bold, semibold
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-poppins',
});

// export const metadata = {
//   title: 'Propella',
//   description: 'Real Estate Listings',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locationInput, setLocationInput] = useState('');

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
        <div className=" flex justify-center items-center mt-[-2rem]">
          <div className="flex relative">
            {/* location popup */}
            <div className="absolute top-[110%] left-1/2 translate-x-[-50%] w-[160%] p-2 rounded-3xl bg-whiteLight text-black z-[30]">
              <div className="flex items-center gap-5 p-3 bg-whiteDark  rounded-3xl">
                <RiSearchLine color="black" />
                <input
                  className="bg-transparent rounded-xl inline-block w-full p-2"
                  type="text"
                  placeholder="Enter location"
                  value={locationInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLocationInput(e.target.value)
                  }
                />
              </div>

              <ul className="py-4 px-2 flex flex-col gap-3">
                {locationInput &&
                  countries
                    .filter(country =>
                      country.name.common
                        .toLowerCase()
                        .startsWith(locationInput.toLowerCase())
                    )
                    .slice(0, 4)
                    .map(enteredCountry => {
                      return (
                        <li
                          key={enteredCountry.name.common}
                          onClick={() =>
                            setLocationInput(enteredCountry.name.common)
                          }
                          className="cursor-pointer flex gap-6 p-2 rounded-3xl hover:bg-whiteDark font-semibold"
                        >
                          {enteredCountry.name.common}
                          <span className="font-normal">3</span>
                        </li>
                      );
                    })}
              </ul>
            </div>

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

        {/* filters */}
        <div className="p-8 flex gap-2">
          <ul className="flex gap-2 items-center">
            <li className="bg-silverGrey px-4 py-2 rounded-lg">Italy</li>
            <li className="bg-silverGrey px-4 py-2 rounded-lg">24-28 March</li>
            <li className="bg-silverGrey px-4 py-2 rounded-lg">
              1 adult + 2 children
            </li>
          </ul>
          <button className="bg-silverGrey px-4 py-2 rounded-lg ">
            Clear X
          </button>
        </div>

        {/* lisings */}
        <div className="p-8 pt-0">
          <ul className="grid grid-cols-4 gap-10">
            <li>
              <div className="relative mb-[1rem]">
                <Image
                  src="/prop1.jpg"
                  alt="property"
                  width={400}
                  height={400}
                  className="rounded-[12%] object-cover w-full h-[320px]"
                />
                <button className="absolute h-[35px] w-[35px] flex justify-center items-center bg-silverGrey rounded-lg bg-opacity-25 top-6 right-6 z-[10]">
                  <AiOutlineHeart />
                </button>
              </div>
              <header className="flex justify-between items-center font-bold">
                <h3 className="capitalize">The Old Village Cottage</h3>
                <span>155 $</span>
              </header>
              <p className="capitalize">Rome, Italy</p>
            </li>
            <li>
              <div className="relative mb-[1rem]">
                <Image
                  src="/prop2.jpg"
                  alt="property"
                  width={400}
                  height={400}
                  className="rounded-[12%] object-cover w-full h-[320px]"
                />
                <button className="absolute h-[35px] w-[35px] flex justify-center items-center bg-silverGrey rounded-lg bg-opacity-25 top-6 right-6 z-[10]">
                  <AiOutlineHeart />
                </button>
              </div>
              <header className="flex justify-between items-center font-bold">
                <h3 className="capitalize">Wooden Apartment</h3>
                <span>320 $</span>
              </header>
              <p className="capitalize">Dublin, Ireland</p>
            </li>
            <li>
              <div className="relative mb-[1rem]">
                <Image
                  src="/prop3.jpg"
                  alt="property"
                  width={400}
                  height={400}
                  className="rounded-[12%] object-cover w-full h-[320px]"
                />
                <button className="absolute h-[35px] w-[35px] flex justify-center items-center bg-silverGrey rounded-lg bg-opacity-25 top-6 right-6 z-[10]">
                  <AiOutlineHeart />
                </button>
              </div>
              <header className="flex justify-between items-center font-bold">
                <h3 className="capitalize">Villa Casa Bella</h3>
                <span>180 $</span>
              </header>
              <p className="capitalize">Catania, Italy</p>
            </li>
            <li>
              <div className="relative mb-[1rem]">
                <Image
                  src="/prop4.jpg"
                  alt="property"
                  width={400}
                  height={400}
                  className="rounded-[12%] object-cover w-full h-[320px]"
                />
                <button className="absolute h-[35px] w-[35px] flex justify-center items-center bg-silverGrey rounded-lg bg-opacity-25 top-6 right-6 z-[10]">
                  <AiOutlineHeart />
                </button>
              </div>
              <header className="flex justify-between items-center font-bold">
                <h3 className="capitalize">Zen Apartment</h3>
                <span>320 $</span>
              </header>
              <p className="capitalize">Tokyo, Japan</p>
            </li>
          </ul>
        </div>

        {children}
      </body>
    </html>
  );
}
