"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Property } from "@prisma/client";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { GrHomeRounded } from "react-icons/gr";
import { BsAirplane } from "react-icons/bs";
import { getTotalDaysNum } from "@/app/libs/helpers";

type ReservationModalProps = {
  selectedProperty: Property;
  startDate: Date | undefined;
  endDate: Date | undefined;
};
const ReservationModal = ({
  selectedProperty,
  startDate,
  endDate,
}: ReservationModalProps) => {
  const router = useRouter();
  const [guests, setGuests] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const reservationHandler = () => {
    setIsLoading(true);

    if (endDate && startDate)
      axios
        .post("/api/reservations", {
          peopleStaying: guests,
          endDate: endDate,
          startDate: startDate,
          propertyId: selectedProperty.id,
        })
        .then(() => {
          router.push("/reservations");
          setIsLoading(false);
        });
  };

  const addGuestHandler = () => {
    setGuests((prev) =>
      prev <= selectedProperty.allowedGuests ? prev + 1 : prev
    );
  };

  const removeGuestHandler = () => {
    setGuests((prev) => (prev >= 2 ? prev - 1 : prev));
  };

  return (
    <div className="flex flex-col rounded-3xl px-12 py-12 lg:py-24 mx-auto max-w-[664px] bg-whiteDark">
      <div className="flex gap-[1.3rem] mb-2">
        <div className="flex flex-col justify-between flex-1 p-6 rounded-3xl bg-whiteLight">
          <GrHomeRounded size={30} />
          <p className="mt-4 mb-1 font-semibold text-body-lg">Arrival</p>
          <p className="text-body-sm">{startDate?.toDateString()}</p>
        </div>
        <div className="flex flex-col flex-1 p-6 rounded-3xl bg-whiteLight">
          <BsAirplane size={30} />
          <p className="mt-4 mb-1 font-semibold text-body-lg">Departure</p>
          <p className="text-body-sm">{endDate?.toDateString()}</p>
        </div>
      </div>

      <div className="flex items-center justify-between py-3 px-6 rounded-3xl bg-whiteLight">
        <p className="font-semibold">Guests</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={removeGuestHandler}
            className="hover:opacity-50 transition-all"
          >
            -
          </button>
          <span>{guests}</span>
          <button
            onClick={addGuestHandler}
            className="hover:opacity-50 transition-all"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center my-4">
        {isLoading ? (
          <div className="py-4 px-6">
            <LoadingSpinner />
          </div>
        ) : (
          <button
            className="w-full py-4 px-6 rounded-3xl bg-grassGreen hover:bg-opacity-90 transition-all text-white font-semibold"
            onClick={reservationHandler}
          >
            Book now
          </button>
        )}
      </div>

      <ul className="flex flex-col gap-3 py-3 px-6 rounded-3xl bg-whiteLight">
        <li className="flex items-center justify-between">
          <p className="font-semibold">Per night</p>
          <span>&euro;{selectedProperty.price}</span>
        </li>
        <li className="flex items-center justify-between">
          <p className="font-semibold">in total</p>
          {endDate && startDate && (
            <span>
              &euro;
              {getTotalDaysNum(startDate, endDate) * selectedProperty.price}
            </span>
          )}
        </li>
      </ul>
    </div>
  );
};

export default ReservationModal;
