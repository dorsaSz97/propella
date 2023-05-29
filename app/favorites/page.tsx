import { getCurrentUser, getFavorites } from '@/app/lib';
import PropertyCard from '@/app/components/PropertyCard';

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  const favorites = await getFavorites(currentUser);

  // TODO: add error.js file
  if (!favorites) return null;

  return (
    <div>
      <p>All your favorites:</p>
      {favorites.map(fav => {
        return <PropertyCard key={fav.id} property={fav} />;
      })}
    </div>
  );
}
