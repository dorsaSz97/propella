import PropertiesClient from "./PropertiesClient";
import { getCurrentUser, getProperties } from "../libs";

export default async function PropertiesPage() {
  const properties = await getProperties();
  const currentUser = await getCurrentUser();

  return <PropertiesClient properties={properties} currentUser={currentUser} />;
}
