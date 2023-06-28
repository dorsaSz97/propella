"use client";
import { Reservation, User } from "@prisma/client";
import PropertiesList from "@/app/components/PropertiesList";
import ReservationItem from "../components/ReservationItem";

type ReservationsClientProps = {
  reservations: Reservation[];
};

const ReservationsClient = ({ reservations }: ReservationsClientProps) => {
  return (
    <main className="mt-12 flex flex-col gap-5">
      <h2 className="text-head3 font-semibold">All your reservations:</h2>
      {/* Properties list */}
      {reservations.length !== 0 ? (
        <div>
          <ul>
            {reservations.map((res) => {
              return <ReservationItem key={res.id} reservationProp={res} />;
            })}
          </ul>
        </div>
      ) : (
        <p>No Reservations yet</p>
      )}
    </main>
  );
};

export default ReservationsClient;
