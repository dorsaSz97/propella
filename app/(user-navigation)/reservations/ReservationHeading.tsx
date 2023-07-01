const ReservationHeading = () => {
  return (
    <li className="grid grid-cols-resList items-center justify-between gap-x-6 font-bold text-body-md text-center">
      <p>Property</p>
      <p>Number of people staying</p>
      <p>From</p>
      <p>To</p>
      <p>Total price</p>
    </li>
  );
};

export default ReservationHeading;
