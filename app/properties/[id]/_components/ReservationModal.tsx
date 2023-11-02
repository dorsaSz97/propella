import { GrHomeRounded } from "react-icons/gr";
import { BsAirplane } from "react-icons/bs";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { Property } from "@prisma/client";
import { useRouter } from "next/navigation";

import { LoadingSpinner } from "@/app/components/LoadingSpinner";

const ReservationModal = ({
  selectedProperty,
  startDate,
  endDate,
  setGuests,
  guests,
}: {
  selectedProperty: Property;
  startDate: Date | undefined;
  endDate: Date | undefined;
  guests: number;
  setGuests: Dispatch<SetStateAction<number>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <div className="max-w-[664px] mx-auto flex flex-col lg:py-32 px-12 py-12 rounded-[2rem] bg-whiteDark">
      <div className="flex gap-[1.3rem] mb-[0.5rem]">
        <div className="bg-whiteLight rounded-[1.5rem] p-6  flex flex-col flex-1">
          <GrHomeRounded size={30} />
          <p className="font-semibold text-body-lg mt-[1.5rem] mb-[0.5rem]">
            Arrival
          </p>
          <p className="text-body-sm">{startDate?.toDateString()}</p>
        </div>
        <div className="bg-whiteLight rounded-[1.5rem] p-6 flex flex-col justify-between flex-1">
          <BsAirplane size={30} />
          <p className="font-semibold text-body-lg mt-[1.5rem] mb-[0.5rem]">
            Departure
          </p>
          <p className="text-body-sm">{endDate?.toDateString()}</p>
        </div>
      </div>
      <div className="bg-whiteLight rounded-[1.5rem] flex justify-between items-center py-3 px-6">
        <p className="font-semibold">Guests</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() =>
              //  guests >= 2 && setGuests(guests-1)
              setGuests((prev) => (prev >= 2 ? prev - 1 : prev))
            }
          >
            -
          </button>
          <span>{guests}</span>
          <button
            onClick={() => {
              guests <= selectedProperty.allowedGuests && setGuests(guests + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <button
          className="bg-grassGreen text-white flex items-center justify-center px-16 py-[1rem] font-semibold rounded-3xl my-[1rem]"
          onClick={() => {
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
                  setIsLoading(false);
                  router.push("/reservations");
                });
          }}
        >
          Book apartment
        </button>
      )}

      <ul className="bg-whiteLight rounded-[1.5rem] flex flex-col gap-3 py-3 px-6">
        <li className="flex items-center justify-between">
          <p className="font-semibold">Per night</p>
          <span>${selectedProperty.price}</span>
        </li>
        <li className="flex items-center justify-between">
          <p className="font-semibold">in total</p>
          {endDate && startDate && (
            <span>
              $
              {((endDate.getTime() - startDate.getTime()) /
                1000 /
                60 /
                60 /
                24 +
                1) *
                selectedProperty.price}
            </span>
          )}
        </li>
      </ul>
    </div>
  );
};

export default ReservationModal;
