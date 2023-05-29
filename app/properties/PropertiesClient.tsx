'use client';

import { Property } from '@prisma/client';
import { IoMapOutline } from 'react-icons/io5';
import { VscListFlat } from 'react-icons/vsc';
import { useState } from 'react';
import { FiltersType } from '../types';
import Filters from '../components/Filters';
import CreatePropModal from '@/app/components/CreatePropModal';
import PropertiesList from '@/app/components/PropertiesList';
import SearchBar from '@/app/components/SearchBar/SearchBar';

const PropertiesClient = ({
  properties,
}: {
  properties: null | Property[];
}) => {
  const [mapView, setIsMapView] = useState(false);
  const [finalFilters, setFinalFilters] = useState<FiltersType | null>(null);

  return (
    <main className="flex items-center justify-center h-screen w-screen relative bg-whiteDark">
      <CreatePropModal />

      <section className="flex h-[95%] w-[95%] p-4 bg-whiteLight rounded-2xl shadow-xl shadow-silverGrey">
        {/* searchbox */}
        <SearchBar setFinalFilters={setFinalFilters} />

        {/* set filters */}
        {finalFilters && (
          <Filters filters={finalFilters} setFilters={setFinalFilters} />
        )}

        {/* properties list + view button */}
        <div className="p-12 pt-0 flex flex-col">
          <div>
            <button
              className="flex items-center justify-center p-3 rounded-2xl my-4 bg-whiteLight"
              onClick={() => {
                setIsMapView(prev => !prev);
              }}
            >
              {mapView ? <VscListFlat /> : <IoMapOutline />}
            </button>
          </div>

          <PropertiesList properties={properties} mapView={mapView} />
          <div className={mapView ? 'flex' : ''}>
            {mapView && <p className="flex-1">Map</p>}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PropertiesClient;
