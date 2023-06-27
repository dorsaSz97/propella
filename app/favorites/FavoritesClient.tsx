"use client";
import { Property, User } from "@prisma/client";
import PropertiesList from "@/app/components/PropertiesList";
import { Page } from "../types";

type FavoritesClientProps = {
  favorites: Property[];
  currentUser: User;
};

const FavoritesClient = ({ favorites, currentUser }: FavoritesClientProps) => {
  return (
    <main className="mt-12 flex flex-col gap-5">
      <h2 className="text-head3 font-semibold">All your favorites:</h2>
      {/* Properties list */}
      {favorites.length !== 0 ? (
        <PropertiesList
          properties={favorites}
          page={Page.Favorites}
          currentUser={currentUser}
        />
      ) : (
        <p>No Favorites yet</p>
      )}
    </main>
  );
};

export default FavoritesClient;
