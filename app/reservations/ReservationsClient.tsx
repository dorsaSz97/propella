// "use client";
// import { Property, User } from "@prisma/client";
// import PropertiesList from "@/app/components/PropertiesList";

// type ReservationsClientProps = {
//   reservations: Reservation[];
//   currentUser: User;
// };

// const ReservationsClient = ({
//   reservations,
//   currentUser,
// }: ReservationsClientProps) => {
//   return (
//     <main className="mt-12 flex flex-col gap-5">
//       <h2 className="text-head3 font-semibold">All your reservations:</h2>
//       {/* Properties list */}
//       {reservations.length !== 0 ? (
//         <PropertiesList properties={reservations} currentUser={currentUser} />
//       ) : (
//         <p>No Reservations yet</p>
//       )}
//     </main>
//   );
// };

// export default ReservationsClient;
