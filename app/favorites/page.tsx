import { getCurrentUser, getFavorites } from '@/app/libs';
import PropertyCard from '@/app/components/PropertyCard';

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error('No user found');

  const favorites = await getFavorites(currentUser);
  if (!favorites) throw new Error('Error getting favorites of the user');

  return (
    <div>
      <p>All your favorites:</p>
      {favorites.length !== 0 ? (
        favorites.map(fav => {
          return <PropertyCard property={fav} />;
        })
      ) : (
        <p>No Favorites yet</p>
      )}
    </div>
  );
}
