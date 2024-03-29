import { Poppins } from "next/font/google";
import NextAuthProvider from "@/app/components/NextAuthProvider";
import CreatePropModal from "@/app/components/CreatePropModal";
import "./globals.scss";

const poppins = Poppins({
  weight: ["400", "600", "700"], // regular, semibold, bold
  style: "normal",
  subsets: ["latin"],
  variable: "--font-poppins", // the css variable gets declared and allows us to access the font (--font-poppins)
});

type Props = {
  children: React.ReactNode;
};
export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <CreatePropModal />
      <NextAuthProvider>
        <body
          className={`relative p-4 md:p-body h-screen scroll-smooth font-poppins bg-whiteDark`}
        >
          {children}
        </body>
      </NextAuthProvider>
    </html>
  );
}
