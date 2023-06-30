"use client";

import { useEffect, useState } from "react";
import { Property, User } from "@prisma/client";
import { Filters } from "@/app/types";
import TabsList from "../components/TabsList";
import CreatePropModal from "@/app/components/CreatePropModal";
import PropertiesList from "@/app/components/PropertiesList";
import SearchBox from "../components/SearchBar/SearchBox";
import { getCurrentUser } from "../libs";

type PropertiesClientProps = {
  currentUser: User | null;
  properties: Property[];
};

const PropertiesClient = ({
  properties,
  currentUser,
}: PropertiesClientProps) => {
  const [chosenFilters, setChosenFilters] = useState<Filters | null>(null);
  const [filteredProperties, setFilteredProperties] =
    useState<Property[]>(properties);

  useEffect(() => {
    // changing the properties
    const filteredProps = properties?.filter((prop) => {
      if (
        chosenFilters?.location === prop.country &&
        chosenFilters?.guests?.adults &&
        chosenFilters.guests.children + chosenFilters.guests.adults <=
          prop.allowedGuests
      ) {
        return prop;
      }
    });
    setFilteredProperties(filteredProps ?? null);
  }, [chosenFilters]);

  return (
    <main>
      <section className="flex flex-col gap-5">
        {/* Search filters box */}
        <SearchBox
          setChosenFilters={setChosenFilters}
          chosenFilters={chosenFilters}
          properties={properties}
        />

        {/* Filters list */}
        {chosenFilters && (
          <TabsList
            filters={chosenFilters}
            setChosenFilters={setChosenFilters}
          />
        )}

        {/* Properties list */}
        <PropertiesList
          properties={chosenFilters ? filteredProperties : properties}
          currentUser={currentUser}
        />
      </section>
    </main>
  );
};

export default PropertiesClient;
