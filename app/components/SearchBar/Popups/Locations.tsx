"use client";
import countries from "world-countries";
import { RiSearchLine } from "react-icons/ri";
import { ChangeEvent, useEffect, useState } from "react";
import { Steps } from "@/app/types";
import { PopupProps } from "./Popup";

const Locations = ({ setFilters, setStep }: PopupProps) => {
  const [locationValue, setLocationValue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  useEffect(() => {
    setFilters((prev) => {
      return { ...prev, location: selectedLocation ?? "" };
    });
  }, [selectedLocation]);

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
                  className="flex gap-3 py-2 px-4 rounded-xl cursor-pointer font-semibold capitalize hover:bg-white"
                  key={country.name.common}
                  onClick={() => {
                    setSelectedLocation(country.name.common);
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

export default Locations;
