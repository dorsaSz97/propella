"use client";
import { Property } from "@prisma/client";
import PropertiesList from "@/app/components/PropertiesList";

type FavoritesClientProps = {
  favorites: Property[];
};

const FavoritesClient = ({ favorites }: FavoritesClientProps) => {
  return (
    <main className="mt-12 flex flex-col gap-5">
      <h2 className="text-head3 font-semibold">All your favorites:</h2>
      {/* Properties list */}
      {favorites.length !== 0 ? (
        <PropertiesList properties={favorites} />
      ) : (
        <p>No Favorites yet</p>
      )}
    </main>
  );
};

export default FavoritesClient;
