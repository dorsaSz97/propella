import Navbar from "../components/Navbar";

export const metadata = {
  title: "Properties | Propella",
  description: "Properties Listing Site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col max-w-[1400px] mx-auto min-h-full w-full p-4 md:px-16 md:py-8 rounded-2xl shadow-xl shadow-silverGrey bg-whiteLight">
      <Navbar />

      <>{children}</>
    </div>
  );
}
