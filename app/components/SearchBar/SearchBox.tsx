"use client";

import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Filters, Steps } from "@/app/types";
import Popups from "./Popups/Popup";
import Location from "./Popups/Location";
import Calender from "./Popups/Calender";
import Guests from "./Popups/Guests";
import BoxBtn from "./BoxBtn";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsCalendar2Date } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import { RiSearchLine } from "react-icons/ri";
import { Property } from "@prisma/client";

const SearchBox = ({
  setChosenFilters,
  chosenFilters,
  properties,
}: {
  chosenFilters: Filters | null;
  properties: Property[];
  setChosenFilters: Dispatch<SetStateAction<Filters | null>>;
}) => {
  const [filters, setFilters] = useState<Filters>(
    chosenFilters === null
      ? {
          location: "",
          guests: { children: 0, adults: 0 },
          duration: { startDate: undefined, endDate: undefined },
        }
      : chosenFilters
  );
  const [popupEl, setPopupEl] = useState<null | ReactElement>(null);
  const [step, setStep] = useState<Steps | null>(null);

  useEffect(() => {
    switch (step) {
      case Steps.Location:
        setPopupEl(
          <Location
            setFilters={setFilters}
            setStep={setStep}
            properties={properties}
          />
        );
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

  useEffect(() => {
    setFilters({
      location: "",
      guests: { children: 0, adults: 0 },
      duration: { startDate: undefined, endDate: undefined },
    });
  }, [chosenFilters]);

  return (
    <div className="flex justify-center items-center mb-12 -mt-5">
      <div className="flex relative">
        {popupEl && <Popups>{popupEl}</Popups>}
        <BoxBtn
          setStep={setStep}
          step={step}
          btnStep={Steps.Location}
          icon={<HiOutlineLocationMarker size={18} />}
        />
        <BoxBtn
          setStep={setStep}
          step={step}
          btnStep={Steps.Duration}
          icon={<BsCalendar2Date size={18} />}
        />
        <BoxBtn
          setStep={setStep}
          step={step}
          btnStep={Steps.Guests}
          icon={<RxPerson size={18} />}
        />

        <div className="h-[4.5rem] w-[4.5rem] p-2 rounded-full bg-whiteDarker">
          <button
            className="flex justify-center items-center h-[95%] w-[95%] rounded-full p-5 text-lg bg-grassGreen btn--filter"
            onClick={() => {
              setChosenFilters(filters);
              setStep(null);
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
