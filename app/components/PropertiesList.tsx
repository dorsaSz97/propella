import { Property, User } from "@prisma/client";
import PropertyCard from "./PropertyCard";

const PropertiesList = ({
  properties,
  currentUser,
}: {
  currentUser: User | null;
  properties: Property[];
}) => {
  return (
    <ul className={"grid grid-cols-5 gap-8"}>
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
