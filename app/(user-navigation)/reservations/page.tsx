import { getCurrentUser, getReservations } from '@/app/libs';
import PageHeading from '@/app/components/PageHeading';
import EmptyList from '@/app/components/EmptyList';
import ReservationsList from './ReservationsList';
import ErrorComponent from '../ErrorComponent';

export default async function ReservationsPage() {
  const currentUser = await getCurrentUser();
  // if (!currentUser) throw new Error("No user found");
  if (!currentUser) return <ErrorComponent message="No user found" />;

  const reservations = await getReservations(currentUser);
  // if (!reservations) throw new Error("Error getting reservations of the user");
  if (!reservations)
    return <ErrorComponent message="Error getting reservations of the user" />;

  return (
    <>
      <PageHeading text="All your reservations" />
      {reservations.length !== 0 ? (
        <ReservationsList reservations={reservations} />
      ) : (
        <EmptyList infoLabel="No Reservations yet" />
      )}
    </>
  );
}
