const ReservationHeading = () => {
  return (
    <li className="hidden lg:grid grid-cols-resList items-center justify-between gap-x-6 font-bold text-body-md text-center">
      <p>Property</p>
      <p>Guests</p>
      <p>From - To</p>

      <p>Total price</p>
    </li>
  );
};

export default ReservationHeading;
