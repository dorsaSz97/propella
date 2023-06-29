import PropertiesClient from "./PropertiesClient";
import { getCurrentUser, getProperties } from "../libs";

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("No user found");

  const properties = await getProperties();
  if (!properties) throw new Error("Error getting properties");

  return <PropertiesClient properties={properties} currentUser={currentUser} />;
}
