import { Property, User } from "@prisma/client";
import PropertyCard from "./PropertyCard";
import axios from "axios";
import { getCurrentUser } from "../libs";
import { Page } from "../types";

const PropertiesList = ({
  mapView,
  properties,
  currentUser,
  page,
}: {
  mapView?: boolean;
  page?: Page;
  currentUser: User | null;
  properties: null | Property[];
}) => {
  if (!properties) return null;
  return (
    <ul
      className={`grid ${
        !mapView ? "grid-cols-5 gap-8" : "grid-cols-3 gap-7 flex-1"
      }`}
    >
      {properties.map((prop) => {
        return (
          <li key={prop.id}>
            <PropertyCard
              property={prop}
              page={page}
              currentUser={currentUser}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default PropertiesList;
