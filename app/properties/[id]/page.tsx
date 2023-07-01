import { getCurrentUser, getSelectedProperty } from "@/app/libs";
import PropertyDetails from "./PropertyDetailsClient";

export default async function PropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const propertyID = params.id;

  const currentUser = await getCurrentUser();

  const selectedProperty = await getSelectedProperty(propertyID);
  if (!selectedProperty)
    throw new Error("Something went wrong. No property to show");

  return (
    <PropertyDetails
      selectedProperty={selectedProperty}
      currentUser={currentUser}
    />
  );
}
