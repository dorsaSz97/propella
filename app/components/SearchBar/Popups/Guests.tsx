'use client';
import { PopupProps, Steps } from '@/app/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const Guests = ({ setFilters, setStep }: PopupProps) => {
  const [adultNumber, setAdultNumber] = useState(0);
  const [petNumber, setPetNumber] = useState(0);
  const [childrenNumber, setChildrenNumber] = useState(0);
  const increaseNumber = (state: Dispatch<SetStateAction<number>>) => {
    state(prev => prev + 1);
  };
  const decreaseNumber = (state: Dispatch<SetStateAction<number>>) => {
    state(prev => {
      if (prev !== 0) {
        return prev - 1;
      } else {
        return 0;
      }
    });
  };

  useEffect(() => {
    setFilters(prev => {
      return {
        ...prev,
        guests: {
          children: childrenNumber,
          pets: petNumber,
          adults: adultNumber,
        },
      };
    });
  }, [adultNumber, petNumber, childrenNumber]);

  return (
    <>
      <ul className="flex flex-col gap-10 text-sm">
        <li className="flex justify-between">
          <label htmlFor="adults" className="font-bold">
            Adults
          </label>

          <div className="flex items-center gap-2">
            <button
              className="w-[30px] h-[30px] rounded-lg p-3 flex justify-center items-center bg-whiteDark"
              onClick={() => decreaseNumber(setAdultNumber)}
            >
              -
            </button>
            <input
              type="text"
              id="adults"
              className="w-[30px] text-center font-bold bg-transparent  inline-block"
              value={adultNumber}
              readOnly
            />
            <button
              onClick={() => increaseNumber(setAdultNumber)}
              className="w-[30px] h-[30px] rounded-lg p-3 flex justify-center items-center bg-whiteDark"
            >
              +
            </button>
          </div>
        </li>
        <li className="flex justify-between">
          <label htmlFor="children" className="font-bold">
            Children
          </label>

          <div className="flex items-center gap-2">
            <button
              onClick={() => decreaseNumber(setChildrenNumber)}
              className="w-[30px] h-[30px] rounded-lg p-3 flex justify-center items-center bg-whiteDark"
            >
              -
            </button>
            <input
              type="text"
              id="children"
              value={childrenNumber}
              className="w-[30px] text-center font-bold bg-transparent  inline-block"
              readOnly
            />
            <button
              onClick={() => increaseNumber(setChildrenNumber)}
              className="w-[30px] h-[30px] rounded-lg p-3 flex justify-center items-center bg-whiteDark"
            >
              +
            </button>
          </div>
        </li>
        <li className="flex justify-between">
          <label htmlFor="pets" className="font-bold">
            Pets
          </label>

          <div className="flex items-center gap-2">
            <button
              onClick={() => decreaseNumber(setPetNumber)}
              className="w-[30px] h-[30px] rounded-lg p-3 flex justify-center items-center bg-whiteDark"
            >
              -
            </button>
            <input
              type="text"
              id="pets"
              value={petNumber}
              readOnly
              className="w-[30px] text-center font-bold bg-transparent  inline-block"
            />
            <button
              onClick={() => increaseNumber(setPetNumber)}
              className="w-[30px] h-[30px] rounded-lg p-3 flex justify-center items-center bg-whiteDark"
            >
              +
            </button>
          </div>
        </li>
      </ul>
      <button onClick={() => setStep(null)}>Set</button>
    </>
  );
};

export default Guests;
