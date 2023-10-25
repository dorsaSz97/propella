"use client";

import { useState } from "react";
import { Property, User } from "@prisma/client";
import { Range } from "react-date-range";
import DetailNav from "./_components/DetailNav";
import PropertyHeader from "./_components/PropertyHeader";
import GalleryHeader from "./_components/GalleryHeader";
import ImageGallery from "./_components/ImageGallery";
import Amenities from "./_components/Amenities";
import AvailableCalender from "./_components/AvailableCalender";
import ReservationModal from "./_components/ReservationModal";

export enum Gallery {
  Kitchen,
  Bathroom,
  Bedroom,
  Outside,
}

const PropertyDetails = ({
  selectedProperty,
  currentUser,
}: {
  selectedProperty: Property;
  currentUser: User | null;
}) => {
  const [guests, setGuests] = useState(1);
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selectedRange",
      color: "#3b6552",
    },
  ]);

  return (
    <main className="lg:px-16 lg:py-12 pb-0 p-0">
      {/* Gallery */}
      <GalleryHeader selectedProperty={selectedProperty} />

      {/* Title */}
      <PropertyHeader
        selectedProperty={selectedProperty}
        currentUser={currentUser}
      />

      {/* Navigation */}
      <DetailNav sameUser={selectedProperty.hostId === currentUser?.id} />

      <div className="lg:flex xl:flex-nowrap flex-wrap gap-6 w-full">
        <div className="flex-[60%] w-full">
          {/* Description */}
          <section className="my-12">
            <p>{selectedProperty.description}</p>
          </section>

          <Amenities selectedProperty={selectedProperty} />

          <ImageGallery selectedProperty={selectedProperty} />

          {/* Available Dates */}
          {selectedProperty.hostId !== currentUser?.id && (
            <AvailableCalender
              propertyDates={selectedProperty.availableDates}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          )}
        </div>

        {/* Reservation Modal */}
        <div className="lg:flex-[40%] lg:top-[2rem] h-fit z-50">
          {selectedProperty.hostId !== currentUser?.id && (
            <ReservationModal
              endDate={dateRange[0].endDate}
              startDate={dateRange[0].startDate}
              guests={guests}
              setGuests={setGuests}
              selectedProperty={selectedProperty}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default PropertyDetails;
