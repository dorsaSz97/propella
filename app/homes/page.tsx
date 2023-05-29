import { getCurrentUser, getYourHomes } from '@/app/lib';
import PropertyCard from '@/app/components/PropertyCard';

export default async function YourHomesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  const yourHomes = await getYourHomes(currentUser);

  // TODO: add error.js file
  if (!yourHomes) return null;

  return (
    <div>
      <p>All properties you added:</p>
      {yourHomes.map(home => {
        return <PropertyCard property={home} />;
      })}
    </div>
  );
}
