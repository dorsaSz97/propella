"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Property, User } from "@prisma/client";
import FavButton from "./FavButton";

const PropertyCard = ({
  property,
  currentUser,
}: {
  property: Property;
  currentUser: User | null;
}) => {
  const router = useRouter();

  const [isFavorited, setIsFavorited] = useState(
    currentUser?.favoriteIds.includes(property.id) ?? false
  );

  return (
    <li
      className="cursor-pointer"
      onClick={() => {
        router.push(`/properties/${property.id}`);
      }}
    >
      <div className="relative mb-[1rem] h-[250px]">
        <Image
          src={property.images[0]}
          alt="property"
          width={700}
          height={700}
          className={`rounded-[20%] object-cover w-full h-full`}
        />
        {property.hostId !== currentUser?.id && (
          <FavButton
            isFilled={isFavorited}
            relPropId={property.id}
            setIsFavorited={setIsFavorited}
          />
        )}
      </div>
      <div className="flex justify-between gap-11 text-body-sm capitalize font-bold">
        <h3>{property.title}</h3>
        <span>${property.price}</span>
      </div>
      <p className="text-body-sm">{property.country}</p>
    </li>
  );
};

export default PropertyCard;
