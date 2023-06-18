import PropertyDetails from '@/app/components/PropertyDetails';
import { getCurrentUser, getSelectedProperty } from '@/app/libs';

export default async function PropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const propertyID = params.id;

  const currentUser = await getCurrentUser();

  const selectedProperty = await getSelectedProperty(propertyID);

  if (!selectedProperty)
    return <p>Something went wrong. No property to show</p>;

  return (
    <PropertyDetails
      selectedProperty={selectedProperty}
      currentUser={currentUser}
    />
  );
}
