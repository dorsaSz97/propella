import React, { Dispatch, SetStateAction } from 'react';
import { FiltersType } from '../types';

const Filters = ({
  filters,
  setFilters,
}: {
  filters: FiltersType;
  setFilters: Dispatch<SetStateAction<FiltersType | null>>;
}) => {
  return (
    <div className="p-8 flex gap-2">
      <ul className="flex gap-2 items-center">
        {filters.location && (
          <li className="bg-silverGrey px-4 py-2 rounded-lg">
            {filters.location}
          </li>
        )}
        {filters.calender.startDate && filters.calender.endDate && (
          <li className="bg-silverGrey px-4 py-2 rounded-lg">
            {filters.calender.startDate.getDate()} -
            {filters.calender.endDate.getDate()}
          </li>
        )}
        {filters.guests.adults !== 0 &&
          (filters.guests.children || filters.guests.pets) && (
            <li className="bg-silverGrey px-4 py-2 rounded-lg">
              {filters.guests.adults} adult + {filters.guests.children} children
            </li>
          )}
      </ul>
      <button
        className="bg-silverGrey px-4 py-2 rounded-lg"
        onClick={() => setFilters(null)}
      >
        Clear
      </button>
    </div>
  );
};

export default Filters;
