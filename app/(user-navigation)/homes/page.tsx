import { getCurrentUser, getYourHomes } from '@/app/libs';
import PropertiesList from '@/app/components/PropertiesList';
import EmptyList from '@/app/components/EmptyList';
import PageHeading from '@/app/components/PageHeading';
import ErrorComponent from '../ErrorComponent';

export default async function YourHomesPage() {
  const currentUser = await getCurrentUser();
  // if (!currentUser) throw new Error("No user found");
  if (!currentUser) return <ErrorComponent message="No user found" />;

  const yourHomes = await getYourHomes(currentUser);
  // if (!yourHomes) throw new Error("Error getting homes of the user");
  if (!yourHomes)
    return <ErrorComponent message="Error getting homes of the user" />;

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
