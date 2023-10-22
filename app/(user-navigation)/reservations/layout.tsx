import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "Reservations | Propella",
  description: "Properties Listing Site",
};

export default function ReservationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-full w-full px-4 md:px-16 py-8 rounded-2xl shadow-xl shadow-silverGrey bg-whiteLight">
      <Navbar />

      <main className="flex-1 flex flex-col gap-5 mt-12">{children}</main>
    </div>
  );
}
