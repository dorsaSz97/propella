import Provider from './components/Provider';
import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '600', '700', '800', '900'], // regular, bold, semibold
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Propella',
  description: 'Real Estate Listings',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <Provider>
        <body className={`text-text-dark font-poppins `}>{children}</body>
      </Provider>
    </html>
  );
}
