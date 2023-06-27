"use client";

import { useState } from "react";
import { Property } from "@prisma/client";
import { Filters } from "@/app/types";
import TabsList from "../components/TabsList";
import CreatePropModal from "@/app/components/CreatePropModal";
import PropertiesList from "@/app/components/PropertiesList";
import SearchBox from "../components/SearchBar/SearchBox";

type PropertiesClientProps = {
  properties: Property[] | null;
};

const PropertiesClient = ({ properties }: PropertiesClientProps) => {
  const [chosenFilters, setChosenFilters] = useState<Filters | null>(null);

  return (
    <main>
      <CreatePropModal />

      <section className="flex flex-col gap-5">
        {/* Search filters box */}
        <SearchBox setChosenFilters={setChosenFilters} />

        {/* Filters list */}
        {chosenFilters && (
          <TabsList
            filters={chosenFilters}
            setChosenFilters={setChosenFilters}
          />
        )}
        {/* Properties list */}
        <PropertiesList properties={properties} />
      </section>
    </main>
  );
};

export default PropertiesClient;
