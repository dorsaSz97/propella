import { getCurrentUser, getYourHomes } from '@/app/libs';
import PropertiesList from '@/app/components/PropertiesList';
import EmptyList from '@/app/components/EmptyList';
import PageHeading from '@/app/components/PageHeading';

export default async function YourHomesPage() {
  const currentUser = await getCurrentUser();
  // if (!currentUser) throw new Error("No user found");
  if (!currentUser) return;

  const yourHomes = await getYourHomes(currentUser);
  // if (!yourHomes) throw new Error("Error getting homes of the user");
  if (!yourHomes) return;

  return (
    <>
      <PageHeading text="All your homes" />
      {yourHomes.length !== 0 ? (
        <PropertiesList properties={yourHomes} currentUser={currentUser} />
      ) : (
        <EmptyList infoLabel="No Homes yet" />
      )}
    </>
  );
}
