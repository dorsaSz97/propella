import { useCreateProperty } from '@/app/store/useStore';
import { FiltersType, Steps } from '@/app/types';
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Locations from './Popups/Locations';
import Calender from './Popups/Calender';
import Guests from './Popups/Guests';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsCalendar2Date } from 'react-icons/bs';
import { RxPerson } from 'react-icons/rx';
import Popups from './Popups/Popups';
import { RiSearchLine } from 'react-icons/ri';

const SearchBar = ({
  setFinalFilters,
}: {
  setFinalFilters: Dispatch<SetStateAction<FiltersType | null>>;
}) => {
  const [filters, setFilters] = useState<FiltersType>({
    location: '',
    guests: { children: 0, adults: 0, pets: 0 },
    calender: { startDate: undefined, endDate: undefined },
  });

  const [popupEl, setPopupEl] = useState<null | ReactElement>(null);
  const [step, setStep] = useState<Steps | null>(null);

  const { isOpen } = useCreateProperty(state => state);

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
    <div className=" flex justify-center items-center mt-[-2rem]">
      <div className="flex relative">
        <Popups>{popupEl || <></>}</Popups>

        <div className="rounded-full h-35 w-35 bg-silverGrey p-2 btn--search">
          <button
            className="flex justify-center items-center h-[75px] w-[75px] rounded-full  bg-silverGrey btn--search"
            onClick={() => setStep(Steps.Location)}
          >
            <HiOutlineLocationMarker size={20} />
          </button>
        </div>

        <div className="rounded-full h-35 w-35 bg-silverGrey p-2 btn--search">
          <button
            className="flex justify-center items-center h-[75px] w-[75px] rounded-full  bg-silverGrey btn--search"
            onClick={() => setStep(Steps.Duration)}
          >
            <BsCalendar2Date size={20} />
          </button>
        </div>

        <div className="rounded-full h-35 w-35 bg-silverGrey p-2 btn--search">
          <button
            className="flex justify-center items-center h-[75px] w-[75px] rounded-full  bg-silverGrey btn--search"
            onClick={() => setStep(Steps.Guests)}
          >
            <RxPerson size={20} />
          </button>
        </div>

        <div className="rounded-full h-35 w-35 bg-silverGrey p-2">
          <button
            className="rounded-full h-25 w-25 bg-grassGreen p-5 text-lg"
            onClick={() => {
              setStep(null);
              setFinalFilters(filters);
            }}
          >
            <RiSearchLine color="white" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
