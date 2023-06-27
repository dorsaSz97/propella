import Provider from "./components/Provider";
import { Poppins } from "next/font/google";
import "./globals.css";
import CreatePropModal from "./components/CreatePropModal";

const poppins = Poppins({
  weight: ["400", "600", "700", "800", "900"], // regular, bold, semibold
  style: "normal",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Propella",
  description: "Real Estate Listings",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth relative`}>
      <CreatePropModal />
      <Provider>
        <body className={`font-poppins p-8 bg-whiteDark relative`}>
          {children}
        </body>
      </Provider>
    </html>
  );
}
