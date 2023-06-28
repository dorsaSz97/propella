"use client";
import Image from "next/image";
import { Property, User } from "@prisma/client";
import FavButton from "./FavButton";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Page } from "../types";

// ${
//   mapView ? 'h-[200px]' : 'h-[320px]'
// }

const PropertyCard = ({
  property,
  currentUser,
  page,
}: {
  page?: Page;
  property: Property;
  currentUser: User;
}) => {
  const [isFavorited, setIsFavorited] = useState(
    currentUser?.favoriteIds.includes(property.id)
  );
  const router = useRouter();
  return (
    <div>
      <div className="relative mb-[1rem]  h-[250px]">
        <Image
          src={property.images[0]}
          alt="property"
          width={400}
          height={700}
          className={`rounded-[20%] object-cover w-full h-full 
        
          `}
        />
        {page !== Page.Home && (
          <button
            className="absolute flex justify-center items-center h-[35px] w-[35px] rounded-lg top-6 right-6 z-[10]  bg-silverGrey "
            onClick={() => {
              if (isFavorited) {
                axios.delete(`/api/favorites/${property.id}`).then((res) => {
                  setIsFavorited(false);
                  {
                    page === Page.Favorites && router.refresh();
                  }
                });
              } else {
                axios.post(`/api/favorites/${property.id}`).then((res) => {
                  setIsFavorited(true);
                });
              }
            }}
          >
            {isFavorited ? <AiOutlineHeart fill="red" /> : <AiOutlineHeart />}
          </button>
        )}
      </div>
      <header
        className="flex justify-between items-center font-bold cursor-pointer"
        onClick={() => {
          router.push(`/properties/${property.id}`);
        }}
      >
        <h3 className="capitalize">{property.title}</h3>
        <span>{property.price} $</span>
      </header>
      <p className="capitalize">{property.country}</p>
    </div>
  );
};

export default PropertyCard;
