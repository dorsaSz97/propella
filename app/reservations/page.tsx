import { getCurrentUser, getReservations } from '@/app/lib';
import Reservation from '@/app/components/Reservation';

export default async function ReservationsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  const reservations = await getReservations(currentUser);

  // TODO: add error.js file
  if (!reservations) return null;

  return (
    <div>
      <p>Your reservations: </p>
      {reservations.map(res => {
        // there are problems with server components rendering async server components
        {
          /* @ts-expect-error Async Server Component */
        }
        // TODO: we could NOT have a separate entity for reservation and have only listing
        return <Reservation key={res.id} res={res} />;
      })}
    </div>
  );
}
