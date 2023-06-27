import PropertiesClient from "./PropertiesClient";
import { getProperties } from "../libs";

export default async function PropertiesPage() {
  const properties = await getProperties();

  return <PropertiesClient properties={properties} />;
}
