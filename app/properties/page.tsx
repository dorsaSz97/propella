'use client';

import Image from 'next/image';
import { RxPerson } from 'react-icons/rx';
import { RiSearchLine } from 'react-icons/ri';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { IoMapOutline } from 'react-icons/io5';
import { BsCalendar2Date } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { VscListFlat } from 'react-icons/vsc';
import { ReactElement, useEffect, useState } from 'react';
import Locations from '../components/SearchBar/Popups/Locations';
import Calender from '../components/SearchBar/Popups/Calender';
import Guests from '../components/SearchBar/Popups/Guests';
import { FiltersType } from '../types';
import Filters from '../components/Filters';

export default function PropertiesPage() {
  const [mapView, setIsMapView] = useState(false);
  const [filters, setFilters] = useState<FiltersType>({
    location: '',
    guests: { children: 0, adults: 0, pets: 0 },
    calender: { startDate: undefined, endDate: undefined },
  });
  const [popup, setPopup] = useState('');
  const [popupEl, setPopupEl] = useState<null | ReactElement>(null);

  useEffect(() => {
    switch (popup) {
      case 'location':
        setPopupEl(<Locations setFilters={setFilters} />);
        break;
      case 'calender':
        setPopupEl(<Calender setFilters={setFilters} />);
        break;
      case 'guests':
        setPopupEl(<Guests setFilters={setFilters} />);
        break;
      default:
        setPopupEl(null);
        break;
    }
  }, [popup]);

  return (
    <main>
      {/* searchbox */}
      <div className=" flex justify-center items-center mt-[-2rem]">
        <div className="flex relative">
          <div className="absolute top-[110%] left-1/2 translate-x-[-50%] w-[110%] p-5 rounded-3xl bg-whiteLight text-black z-[30]">
            {popupEl}
          </div>

          <div className="rounded-full h-35 w-35 bg-silverGrey p-2 btn--search">
            <button
              className="rounded-full h-25 w-25  p-5 text-lg"
              onClick={() => setPopup('location')}
            >
              <HiOutlineLocationMarker />
            </button>
          </div>

          <div className="rounded-full h-35 w-35 bg-silverGrey p-2 btn--search">
            <button
              className="rounded-full h-25 w-25  p-5 text-lg"
              onClick={() => setPopup('calender')}
            >
              <BsCalendar2Date />
            </button>
          </div>

          <div className="rounded-full h-35 w-35 bg-silverGrey p-2 btn--search">
            <button
              className="rounded-full h-25 w-25  p-5 text-lg"
              onClick={() => setPopup('guests')}
            >
              <RxPerson />
            </button>
          </div>

          <div className="rounded-full h-35 w-35 bg-silverGrey p-2">
            <button className="rounded-full h-25 w-25 bg-grassGreen p-5 text-lg">
              <RiSearchLine color="white" />
            </button>
          </div>
        </div>
      </div>

      {/* filters */}
      <Filters filters={filters} setFilters={setFilters} />
      {/* lisings */}
      <div className="p-8 pt-0 flex flex-col">
        <div>
          <button
            className="flex items-center justify-center p-3 rounded-2xl my-4 bg-whiteLight"
            onClick={() => {
              setIsMapView(prev => !prev);
            }}
          >
            {mapView ? `List View ` : `Map View `}
            {mapView ? <VscListFlat /> : <IoMapOutline />}
          </button>
        </div>

        <div className={mapView ? 'flex' : ''}>
          <ul
            className={`grid ${
              !mapView ? 'grid-cols-4 gap-10' : 'grid-cols-3 gap-7 flex-1'
            }`}
          >
            <li>
              <div className="relative mb-[1rem]">
                <Image
                  src="/prop1.jpg"
                  alt="property"
                  width={400}
                  height={400}
                  className={`rounded-[12%] object-cover w-full ${
                    mapView ? 'h-[200px]' : 'h-[320px]'
                  } `}
                />
                <button className="absolute h-[35px] w-[35px] flex justify-center items-center bg-silverGrey rounded-lg bg-opacity-25 top-6 right-6 z-[10]">
                  <AiOutlineHeart />
                </button>
              </div>
              <header className="flex justify-between items-center font-bold">
                <h3 className="capitalize">The Old Village Cottage</h3>
                <span>155 $</span>
              </header>
              <p className="capitalize">Rome, Italy</p>
            </li>
            <li>
              <div className="relative mb-[1rem]">
                <Image
                  src="/prop2.jpg"
                  alt="property"
                  width={400}
                  height={400}
                  className={`rounded-[12%] object-cover w-full ${
                    mapView ? 'h-[200px]' : 'h-[320px]'
                  } `}
                />
                <button className="absolute h-[35px] w-[35px] flex justify-center items-center bg-silverGrey rounded-lg bg-opacity-25 top-6 right-6 z-[10]">
                  <AiOutlineHeart />
                </button>
              </div>
              <header className="flex justify-between items-center font-bold">
                <h3 className="capitalize">Wooden Apartment</h3>
                <span>320 $</span>
              </header>
              <p className="capitalize">Dublin, Ireland</p>
            </li>
            <li>
              <div className="relative mb-[1rem]">
                <Image
                  src="/prop3.jpg"
                  alt="property"
                  width={400}
                  height={400}
                  className={`rounded-[12%] object-cover w-full ${
                    mapView ? 'h-[200px]' : 'h-[320px]'
                  } `}
                />
                <button className="absolute h-[35px] w-[35px] flex justify-center items-center bg-silverGrey rounded-lg bg-opacity-25 top-6 right-6 z-[10]">
                  <AiOutlineHeart />
                </button>
              </div>
              <header className="flex justify-between items-center font-bold">
                <h3 className="capitalize">Villa Casa Bella</h3>
                <span>180 $</span>
              </header>
              <p className="capitalize">Catania, Italy</p>
            </li>
            <li>
              <div className="relative mb-[1rem]">
                <Image
                  src="/prop4.jpg"
                  alt="property"
                  width={400}
                  height={400}
                  className={`rounded-[12%] object-cover w-full ${
                    mapView ? 'h-[200px]' : 'h-[320px]'
                  } `}
                />
                <button className="absolute h-[35px] w-[35px] flex justify-center items-center bg-silverGrey rounded-lg bg-opacity-25 top-6 right-6 z-[10]">
                  <AiOutlineHeart />
                </button>
              </div>
              <header className="flex justify-between items-center font-bold">
                <h3 className="capitalize">Zen Apartment</h3>
                <span>320 $</span>
              </header>
              <p className="capitalize">Tokyo, Japan</p>
            </li>
          </ul>
          {mapView && <p className="flex-1">Map</p>}
        </div>
      </div>
    </main>
  );
}
