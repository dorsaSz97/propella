import { Reservation } from "@prisma/client";
import ReservationItem from "./ReservationItem";
import ReservationHeading from "./ReservationHeading";

const ReservationsList = ({
  reservations,
}: {
  reservations: Reservation[];
}) => {
  return (
    <ul className="flex flex-col gap-6 mt-7">
      <ReservationHeading />
      {reservations.map((res) => {
        return <ReservationItem key={res.id} item={res} />;
      })}
    </ul>
  );
};

export default ReservationsList;
