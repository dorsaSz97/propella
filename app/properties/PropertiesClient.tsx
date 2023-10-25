"use client";

import { useEffect, useState } from "react";
import { Property, User } from "@prisma/client";
import PropertiesList from "@/app/components/PropertiesList";
import SearchBox from "./_components/SearchBox/SearchBox";
import TabsList from "./_components/TabsList";
export type Filters = {
  location: string;
  duration: { startDate: Date | undefined; endDate: Date | undefined };
  guests: { adults: number; children: number };
};
export enum Steps {
  Location = 1,
  Duration,
  Guests,
}

export const getDateArray = function (start: Date, end: Date) {
  let arr = [];
  let curr = new Date(start);
  const endDate = new Date(end);

  while (curr <= endDate) {
    arr.push(new Date(curr));
    curr.setDate(curr.getDate() + 1);
  }

  return arr;
};
const PropertiesClient = ({
  properties,
  currentUser,
}: {
  currentUser: User | null;
  properties: Property[];
}) => {
  const [chosenFilters, setChosenFilters] = useState<Filters | null>(null);

  const [filteredProperties, setFilteredProperties] =
    useState<Property[]>(properties);

  const [filters, setFilters] = useState<Filters>(
    chosenFilters === null
      ? {
          location: "",
          duration: { startDate: undefined, endDate: undefined },
          guests: { children: 0, adults: 0 },
        }
      : chosenFilters
  );

  useEffect(() => {
    let filteredProps: Property[] = [];

    if (chosenFilters) {
      filteredProps = properties.filter((prop) => {
        let filteredProp: Property = { ...prop };

        if (
          chosenFilters.location &&
          chosenFilters.guests.adults &&
          chosenFilters.duration.endDate &&
          chosenFilters.duration.startDate
        ) {
          if (
            chosenFilters.location === prop.country &&
            chosenFilters.guests.adults === prop.allowedGuests &&
            getDateArray(
              chosenFilters.duration.startDate,
              chosenFilters.duration.endDate
            ).every((date) => prop.availableDates.includes(date))
          )
            return prop;
        } else {
          console.log(filteredProps);
          if (chosenFilters.location) {
            if (chosenFilters.location === prop.country) {
              filteredProp = { ...prop };
            } else {
              return false;
            }
          }
          console.log(filteredProps);
          if (chosenFilters.guests.adults) {
            if (chosenFilters.guests.adults > prop.allowedGuests) return false;
          }
          console.log(filteredProps);
          if (
            chosenFilters.duration.endDate &&
            chosenFilters.duration.startDate
          ) {
            if (
              !getDateArray(
                chosenFilters.duration.startDate,
                chosenFilters.duration.endDate
              ).every((date) =>
                prop.availableDates
                  .map((d) => d.toLocaleString())
                  .includes(date.toLocaleString())
              )
            )
              return false;
          }

          return filteredProp;
        }
      });

      setFilteredProperties(filteredProps);
    } else {
      setFilteredProperties(properties);
      setFilters({
        location: "",
        duration: { startDate: undefined, endDate: undefined },
        guests: { children: 0, adults: 0 },
      });
    }
  }, [chosenFilters]);

  return (
    <main className="flex flex-col gap-5">
      <SearchBox
        setChosenFilters={setChosenFilters}
        filters={filters}
        setFilters={setFilters}
        properties={properties}
      />

      {chosenFilters && (
        <TabsList
          chosenFilters={chosenFilters}
          setChosenFilters={setChosenFilters}
          setFilters={setFilters}
        />
      )}

      <PropertiesList
        properties={filteredProperties}
        currentUser={currentUser}
      />
    </main>
  );
};

export default PropertiesClient;
