"use client";
import { Dispatch, SetStateAction } from "react";
import { Filters } from "@/app/types";

const TabsList = ({
  filters,
  setChosenFilters,
}: {
  filters: Filters;
  setChosenFilters: Dispatch<SetStateAction<Filters | null>>;
}) => {
  return (
    <div className="flex items-center gap-2">
      <ul className="flex items-center gap-2">
        {filters.location && (
          <li className="px-4 py-2 rounded-xl bg-whiteDark">
            {filters.location}
          </li>
        )}
        {filters.duration.startDate && filters.duration.endDate && (
          <li className="px-4 py-2 rounded-xl bg-whiteDark">
            {filters.duration.startDate.getDate()} -{" "}
            {filters.duration.endDate.getDate()}
          </li>
        )}
        {filters.guests.adults !== 0 && (
          <li className="px-4 py-2 rounded-xl bg-whiteDark">
            {filters.guests.adults} adult{filters.guests.adults > 1 && "s"} +{" "}
            {filters.guests.children}{" "}
            {filters.guests.children > 1 ? "children" : "child"} +{" "}
            {filters.guests.pets} pet{filters.guests.pets > 1 && "s"}
          </li>
        )}
      </ul>
      <button
        className="px-4 py-2 rounded-xl underline"
        onClick={() => {
          setChosenFilters(null);
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default TabsList;
