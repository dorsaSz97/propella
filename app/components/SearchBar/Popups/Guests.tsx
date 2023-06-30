"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { PopupProps } from "./Popup";

const Guests = ({ setFilters, setStep }: PopupProps) => {
  const [adultsNumber, setAdultsNumber] = useState(0);
  const [childrenNumber, setChildrenNumber] = useState(0);
  const [petsNumber, setPetsNumber] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-col gap-8 text-body-sm">
        <GuestsInput
          label={"adults"}
          setFn={setAdultsNumber}
          inputValue={adultsNumber}
        />
        <GuestsInput
          label={"children"}
          setFn={setChildrenNumber}
          inputValue={childrenNumber}
        />
      </ul>

      <button
        className="self-center p-2 underline text-grassGreen text-sm font-bold"
        onClick={() => {
          setFilters((prev) => {
            return {
              ...prev,
              guests: {
                adults: adultsNumber,
                children: childrenNumber,
              },
            };
          });

          setStep(null);
        }}
      >
        Set
      </button>
    </div>
  );
};

export default Guests;

const GuestsInput = ({
  setFn,
  label,
  inputValue,
}: {
  setFn: Dispatch<SetStateAction<number>>;
  label: string;
  inputValue: number;
}) => {
  const increase = (state: Dispatch<SetStateAction<number>>) => {
    state((prev) => prev + 1);
  };
  const decrease = (state: Dispatch<SetStateAction<number>>) => {
    state((prev) => {
      if (prev !== 0) {
        return prev - 1;
      } else {
        return 0;
      }
    });
  };

  return (
    <li className="flex justify-between items-center">
      <label htmlFor={label} className="capitalize font-bold">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          className="flex justify-center items-center w-[40px] h-[40px] p-3 rounded-2xl bg-whiteDarker hover:bg-opacity-80"
          onClick={() => decrease(setFn)}
        >
          -
        </button>
        <input
          type="text"
          id={label}
          className="inline-block w-[30px] text-center font-bold bg-transparent"
          value={inputValue}
          readOnly
        />
        <button
          className="flex justify-center items-center w-[40px] h-[40px] p-3 rounded-2xl bg-whiteDarker hover:bg-opacity-80"
          onClick={() => increase(setFn)}
        >
          +
        </button>
      </div>
    </li>
  );
};
