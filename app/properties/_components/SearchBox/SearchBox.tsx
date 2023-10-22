"use client";

import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Property } from "@prisma/client";
import Popup from "./Popups/Popup";
import Location from "./Popups/Location";
import Calender from "./Popups/Calender";
import Guests from "./Popups/Guests";
import SearchBoxBtn from "./SearchBoxBtn";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsCalendar2Date } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import { RiSearchLine } from "react-icons/ri";
import { Filters, Steps } from "../../PropertiesClient";

const SearchBox = ({
  setChosenFilters,
  filters,
  setFilters,
  properties,
}: {
  setChosenFilters: Dispatch<SetStateAction<Filters | null>>;
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  properties: Property[];
}) => {
  const [popupEl, setPopupEl] = useState<ReactElement | null>(null);
  const [currentStep, setCurrentStep] = useState<Steps | null>(null);

  useEffect(() => {
    switch (currentStep) {
      case Steps.Location:
        setPopupEl(
          <Location
            setStep={setCurrentStep}
            setFilters={setFilters}
            properties={properties}
          />
        );
        break;
      case Steps.Duration:
        setPopupEl(
          <Calender setStep={setCurrentStep} setFilters={setFilters} />
        );
        break;
      case Steps.Guests:
        setPopupEl(<Guests setStep={setCurrentStep} setFilters={setFilters} />);
        break;
      default:
        setPopupEl(null);
        break;
    }
  }, [currentStep]);

  return (
    <div className="flex justify-center items-center lg:mb-12 lg:-mt-5 my-4">
      <div className="flex relative">
        {popupEl && <Popup>{popupEl}</Popup>}

        <SearchBoxBtn
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          btnStep={Steps.Location}
          icon={<HiOutlineLocationMarker size={18} color="#222" />}
        />
        <SearchBoxBtn
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          btnStep={Steps.Duration}
          icon={<BsCalendar2Date size={18} color="#222" />}
        />
        <SearchBoxBtn
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          btnStep={Steps.Guests}
          icon={<RxPerson size={18} color="#222" />}
        />
        {/* search button */}
        <div className="flex justify-center items-center h-[4.5rem] w-[4.5rem] rounded-full bg-whiteDarker btn--filter">
          <button
            className="flex justify-center items-center h-[80%] w-[80%] rounded-full bg-grassGreen"
            onClick={() => {
              setChosenFilters(filters);
              setCurrentStep(null);
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
