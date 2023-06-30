import PropertiesClient from "./PropertiesClient";
import { getCurrentUser, getProperties } from "../libs";

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser();

  const properties = await getProperties();
  if (!properties) throw new Error("Error getting properties");

  return <PropertiesClient properties={properties} currentUser={currentUser} />;
}
