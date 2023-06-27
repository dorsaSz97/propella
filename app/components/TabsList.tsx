import React, { Dispatch, SetStateAction } from "react";
import { Filters } from "../types";

const TabsList = ({
  filters,
  setChosenFilters,
}: {
  filters: Filters;
  setChosenFilters: Dispatch<SetStateAction<Filters | null>>;
}) => {
  return (
    <div className="flex gap-2">
      <ul className="flex gap-2 items-center">
        {filters.location && (
          <li className="bg-whiteDark px-4 py-2 rounded-xl">
            {filters.location}
          </li>
        )}
        {filters.duration.startDate && filters.duration.endDate && (
          <li className="bg-whiteDark px-4 py-2 rounded-xl">
            {filters.duration.startDate.getDate()} -
            {filters.duration.endDate.getDate()}
          </li>
        )}
        {filters.guests.adults !== 0 &&
          (filters.guests.children || filters.guests.pets) && (
            <li className="bg-whiteDark px-4 py-2 rounded-xl">
              {filters.guests.adults} adult + {filters.guests.children} children
            </li>
          )}
      </ul>
      <button
        className="bg-whiteLight px-4 py-2 rounded-xl"
        onClick={() => setChosenFilters(null)}
      >
        Clear
      </button>
    </div>
  );
};

export default TabsList;
