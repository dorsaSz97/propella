'use client';
import countries from 'world-countries';
import { RiSearchLine } from 'react-icons/ri';
import { ChangeEvent, useEffect, useState } from 'react';
import { PopupProps } from '@/app/types';

const Locations = ({ setFilters }: PopupProps) => {
  const [locationInput, setLocationInput] = useState('');
  useEffect(() => {
    setFilters(prev => {
      return { ...prev, location: locationInput };
    });
  }, [locationInput]);

  return (
    <>
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
                  onClick={() => setLocationInput(enteredCountry.name.common)}
                  className="cursor-pointer flex gap-6 p-2 rounded-3xl hover:bg-whiteDark font-semibold"
                >
                  {enteredCountry.name.common}
                  <span className="font-normal">3</span>
                </li>
              );
            })}
      </ul>
    </>
  );
};

export default Locations;
