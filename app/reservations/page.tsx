import { getCurrentUser, getReservations } from "@/app/libs";
import ReservationsClient from "./ReservationsClient";

export default async function ReservationsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("No user found");

  const reservations = await getReservations(currentUser);
  if (!reservations) throw new Error("Error getting reservations of the user");

  return (
    <ReservationsClient currentUser={currentUser} reservations={reservations} />
  );
}
