'use client';

import { useEffect, useState } from 'react';
import { Property, User } from '@prisma/client';
import PropertiesList from '@/app/components/PropertiesList';
import SearchBox from './_components/SearchBox/SearchBox';
import TabsList from './_components/TabsList';
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
          location: '',
          duration: { startDate: undefined, endDate: undefined },
          guests: { children: 0, adults: 0 },
        }
      : chosenFilters
  );

  useEffect(() => {
    let filteredProps: Property[];

    if (chosenFilters) {
      filteredProps = properties.filter(prop => {
        if (chosenFilters.location && chosenFilters.guests.adults) {
          chosenFilters.location === prop.country &&
            chosenFilters.guests.adults === prop.allowedGuests;
        } else if (chosenFilters.location) {
          chosenFilters.location === prop.country;
        } else if (chosenFilters.guests.adults) {
          chosenFilters.guests.adults === prop.allowedGuests;
        }
      });

      setFilteredProperties(filteredProps);
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
