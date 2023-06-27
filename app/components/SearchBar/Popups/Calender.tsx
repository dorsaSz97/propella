"use client";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DateRangePicker, Range } from "react-date-range";
import { Filters, PopupProps, Steps } from "@/app/types";

const Calender = ({ setFilters, setStep }: PopupProps) => {
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "reservation",
    },
  ]);

  return (
    <div className="p-6 pb-2 flex flex-col gap-6">
      <DateRangePicker
        minDate={new Date()}
        months={2}
        ranges={dateRange}
        onChange={(ranges) => {
          setDateRange([ranges.reservation]);
        }}
        direction="horizontal"
        showPreview={true}
        rangeColors={["#3b6552"]}
        // disabledDates={[]}
      />
      <button
        className="self-end font-semibold text-white bg-grassGreen p-1 text-sm rounded-md"
        onClick={() => {
          setFilters((prev) => {
            return {
              ...prev,
              calender: {
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
