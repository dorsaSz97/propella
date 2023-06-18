import { getCurrentUser, getReservations } from '@/app/libs';

export default async function ReservationsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error('No user found');

  const reservations = await getReservations(currentUser);
  if (!reservations) throw new Error('Error getting reservations of the user');

  return (
    <div>
      <p>Your reservations: </p>
      {reservations.length !== 0 ? (
        <ul>
          {reservations.map(res => {
            return (
              <li key={res.id}>
                {res.peopleStaying} {res.totalPrice}{' '}
                {res.startDate.toISOString()} {res.endDate.toISOString()}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No reservations yet</p>
      )}
    </div>
  );
}
