"use client";
import countries from "world-countries";
import { RiSearchLine } from "react-icons/ri";
import { ChangeEvent, useState } from "react";
import { Steps } from "@/app/types";
import { PopupProps } from "./Popup";

const Location = ({ setFilters, setStep }: PopupProps) => {
  const [locationValue, setLocationValue] = useState("");

  return (
    <div className="flex flex-col gap-4 text-body-sm">
      <div className="flex items-center gap-1 px-4 py-1 rounded-3xl bg-whiteDarker">
        <RiSearchLine color="#222" size={18} />
        <input
          className="w-full p-2 outline-none bg-transparent"
          type="text"
          placeholder="Enter location"
          value={locationValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLocationValue(e.target.value)
          }
        />
      </div>

      {locationValue && (
        <ul className="flex flex-col gap-1 px-1">
          {countries
            .filter((country) =>
              country.name.common
                .toLowerCase()
                .startsWith(locationValue.toLowerCase())
            )
            .slice(0, 4)
            .map((country) => {
              return (
                <li
                  className="flex gap-3 py-2 px-4 rounded-xl cursor-pointer font-semibold capitalize hover:bg-whiteDarker hover:bg-opacity-30"
                  key={country.name.common}
                  onClick={() => {
                    setFilters((prev) => {
                      return { ...prev, location: country.name.common ?? "" };
                    });
                    setStep(Steps.Duration);
                  }}
                >
                  {country.name.common}
                  <span className="font-normal">3</span>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default Location;
