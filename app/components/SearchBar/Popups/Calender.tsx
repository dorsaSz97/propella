"use client";
import { useState } from "react";
import { Steps } from "@/app/types";
import { PopupProps } from "./Popup";
import { DateRangePicker, Range } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const Calender = ({ setFilters, setStep }: PopupProps) => {
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selectedRange",
      color: "#3b6552",
    },
  ]);

  return (
    <div className="flex flex-col gap-6 popup--calender">
      <DateRangePicker
        minDate={new Date()}
        months={2}
        direction="horizontal"
        ranges={dateRange}
        onChange={(ranges) => {
          setDateRange([ranges.selectedRange]);
        }}
      />
      <button
        className="self-end p-2 underline text-grassGreen text-sm font-bold"
        onClick={() => {
          setFilters((prev) => {
            return {
              ...prev,
              duration: {
                startDate: dateRange[0].startDate,
                endDate: dateRange[0].endDate,
              },
            };
          });
          setStep(Steps.Guests);
        }}
      >
        Set
      </button>
    </div>
  );
};

export default Calender;
