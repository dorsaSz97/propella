import { getCurrentUser, getYourHomes } from '@/app/libs';
import PropertyCard from '@/app/components/PropertyCard';

export default async function YourHomesPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error('No user found');

  const yourHomes = await getYourHomes(currentUser);
  if (!yourHomes) throw new Error('Error getting homes of the user');

  return (
    <div>
      <p>All properties you added:</p>
      {yourHomes.length !== 0 ? (
        yourHomes.map(home => {
          return <PropertyCard property={home} />;
        })
      ) : (
        <p>No homes yet</p>
      )}
    </div>
  );
}
