import Navbar from "../components/Navbar";

export const metadata = {
  title: "Your Homes | Propella",
  description: "Properties Listing Site",
};

export default function HomesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full px-16 py-8 rounded-2xl shadow-xl shadow-silverGrey bg-whiteLight">
      <Navbar />
      <>{children}</>
    </div>
  );
}
