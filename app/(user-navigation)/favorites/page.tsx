import { getCurrentUser, getFavorites } from '@/app/libs';
import PropertiesList from '@/app/components/PropertiesList';
import EmptyList from '@/app/components/EmptyList';
import PageHeading from '@/app/components/PageHeading';

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return; // goes to the error page
  // if (!currentUser) throw new Error("No user found"); // goes to the error page

  const favorites = await getFavorites(currentUser);
  // if (!favorites) throw new Error("Error getting favorites of the user");
  if (!favorites) return;

  return (
    <>
      <PageHeading text="All your favorites" />
      {favorites.length !== 0 ? (
        <PropertiesList properties={favorites} currentUser={currentUser} />
      ) : (
        <EmptyList infoLabel="No Favorites yet" />
      )}
    </>
  );
}
