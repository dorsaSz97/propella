import Navbar from '../components/Navbar';
import { getProperties } from '../libs';
import PropertiesClient from './PropertiesClient';

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
    <>
      <Navbar />
      <>{children}</>
    </>
  );
}
