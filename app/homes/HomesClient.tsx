"use client";
import { Property, User } from "@prisma/client";
import PropertiesList from "@/app/components/PropertiesList";
import { Page } from "../types";

type HomesClientProps = {
  yourHomes: Property[];
  currentUser: User;
};

const HomesClient = ({ yourHomes, currentUser }: HomesClientProps) => {
  return (
    <main className="mt-12 flex flex-col gap-5">
      <h2 className="text-head3 font-semibold">All your Homes:</h2>
      {/* Properties list */}
      {yourHomes.length !== 0 ? (
        <PropertiesList
          properties={yourHomes}
          page={Page.Home}
          currentUser={currentUser}
        />
      ) : (
        <p>No Homes yet</p>
      )}
    </main>
  );
};

export default HomesClient;
