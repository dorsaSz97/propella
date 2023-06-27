import { getCurrentUser, getFavorites } from "@/app/libs";
import FavoritesClient from "./FavoritesClient";

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("No user found");

  const favorites = await getFavorites(currentUser);
  if (!favorites) throw new Error("Error getting favorites of the user");

  return <FavoritesClient favorites={favorites} />;
}
