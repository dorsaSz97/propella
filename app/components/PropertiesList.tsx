import { Property, User } from "@prisma/client";
import PropertyCard from "./PropertyCard";

const PropertiesList = ({
  properties,
  currentUser,
}: {
  properties: Property[];
  currentUser: User | null;
}) => {
  return (
    <ul className={"grid justify-items-center grid-cols-propList gap-8"}>
      {properties.map((prop) => {
        return (
          <PropertyCard
            key={prop.id}
            property={prop}
            currentUser={currentUser}
          />
        );
      })}
    </ul>
  );
};

export default PropertiesList;
