import { getCurrentUser, getYourHomes } from "@/app/libs";
import PropertyCard from "@/app/components/PropertyCard";
import HomesClient from "./HomesClient";

export default async function YourHomesPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("No user found");

  const yourHomes = await getYourHomes(currentUser);
  if (!yourHomes) throw new Error("Error getting homes of the user");

  return <HomesClient yourHomes={yourHomes} currentUser={currentUser} />;
}
