import { getCurrentUser, getReservations } from "@/app/libs";
import ReservationsClient from "./ReservationsClient";

export default async function ReservationsPage() {
  const currentUser = await getCurrentUser();
  // go to the error page
  if (!currentUser) throw new Error("No user found");

  const reservations = await getReservations(currentUser);
  // go to the error page
  if (!reservations) throw new Error("Error getting reservations of the user");
  console.log(reservations);
  return <ReservationsClient reservations={reservations} />;
}
