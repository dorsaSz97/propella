import CreatePropModal from "../components/CreatePropModal";
import Navbar from "../components/Navbar";
import { getProperties } from "../libs";
import PropertiesClient from "./PropertiesClient";

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
    <div className="flex flex-col min-h-screen w-full px-16 py-8 rounded-2xl shadow-xl shadow-silverGrey bg-whiteLight">
      <Navbar hasExtra />
      <>{children}</>
    </div>
  );
}
