"use client";

import { useCreateProperty } from "@/app/store/useStore";
import { Filters, Steps } from "@/app/types";
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Locations from "./Popups/Locations";
import Calender from "./Popups/Calender";
import Guests from "./Popups/Guests";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsCalendar2Date } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import Popups from "./Popups/Popup";
import { RiSearchLine } from "react-icons/ri";

const SearchBox = ({
  setChosenFilters,
}: {
  setChosenFilters: Dispatch<SetStateAction<Filters | null>>;
}) => {
  const [filters, setFilters] = useState<Filters>({
    location: "",
    guests: { children: 0, adults: 0, pets: 0 },
    calender: { startDate: undefined, endDate: undefined },
  });

  const [popupEl, setPopupEl] = useState<null | ReactElement>(null);
  const [step, setStep] = useState<Steps | null>(null);

  const { isOpen } = useCreateProperty((state) => state);

  useEffect(() => {
    switch (step) {
      case Steps.Location:
        setPopupEl(<Locations setFilters={setFilters} setStep={setStep} />);
        break;
      case Steps.Duration:
        setPopupEl(<Calender setFilters={setFilters} setStep={setStep} />);
        break;
      case Steps.Guests:
        setPopupEl(<Guests setFilters={setFilters} setStep={setStep} />);
        break;
      default:
        setPopupEl(null);
        break;
    }
  }, [step]);

  return (
    <div className="flex justify-center items-center mb-12 -mt-5">
      <div className="flex relative">
        {popupEl && <Popups>{popupEl}</Popups>}

        <div className="flex justify-center items-center h-[4.5rem] w-[4.5rem] rounded-full bg-whiteDarker btn--search">
          <button
            className="flex justify-center items-center h-[80%] w-[80%] rounded-full bg-whiteLight btn--search"
            onClick={() => setStep(Steps.Location)}
          >
            <HiOutlineLocationMarker size={18} />
          </button>
        </div>

        <div className="rounded-full h-[4.5rem] w-[4.5rem] bg-whiteDarker p-2 btn--search">
          <button
            className="flex justify-center items-center h-[95%] w-[95%] rounded-full  bg-whiteLight btn--search"
            onClick={() => setStep(Steps.Duration)}
          >
            <BsCalendar2Date size={18} />
          </button>
        </div>

        <div className="rounded-full h-[4.5rem] w-[4.5rem] bg-whiteDarker p-2 btn--search">
          <button
            className="flex justify-center items-center h-[95%] w-[95%] rounded-full  bg-whiteLight btn--search"
            onClick={() => setStep(Steps.Guests)}
          >
            <RxPerson size={18} />
          </button>
        </div>

        <div className="rounded-full h-[4.5rem] w-[4.5rem] bg-whiteDarker p-2">
          <button
            className="flex justify-center items-center h-[95%] w-[95%] rounded-full bg-grassGreen p-5 text-lg btn--search"
            onClick={() => {
              setStep(null);
              setChosenFilters(filters);
            }}
          >
            <RiSearchLine color="white" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
