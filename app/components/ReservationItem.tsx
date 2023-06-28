import { Reservation } from "@prisma/client";
import React from "react";
import { getSelectedProperty } from "../libs";

const ReservationItem = ({
  reservationProp,
}: {
  reservationProp: Reservation;
}) => {
  // const selectedProperty = await getSelectedProperty(
  //   reservationProp.propertyId
  // );
  return (
    <li key={reservationProp.id}>
      {/* <img src={selectedProperty?.images[0]} alt="" /> */}
      <p>{reservationProp.peopleStaying} people staying</p>
      <p>
        from {reservationProp.startDate.toDateString()} to{" "}
        {reservationProp.endDate.toDateString()}
      </p>
      <span>{reservationProp.totalPrice} euros in total</span>
    </li>
  );
};

export default ReservationItem;
