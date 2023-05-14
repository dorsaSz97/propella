// apply the styles to every route in our app
import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '600', '700'], // regular, bold, semibold
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Propella',
  description: 'Real Estate Listings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className={`text-text-dark font-poppins px-5 py-3`}>
        {/* navigation */}
        <header className="flex justify-between items-center px-5 py-3">
          <h1 className="font-bold text-head1 text-grassGreen">
            <a href="/">Propella</a>
          </h1>
          <div className="flex gap-4 items-center">
            <button className="border-grassGreen border-2 rounded-full px-6 py-1 text-body-lg">
              Login
            </button>
            <button className="border-grassGreen border-2 rounded-full px-6 py-1 text-body-lg bg-grassGreen text-white">
              Register
            </button>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
