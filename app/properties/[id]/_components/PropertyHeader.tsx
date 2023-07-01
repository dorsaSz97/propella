'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Property, User } from '@prisma/client';
import { AiOutlineHeart } from 'react-icons/ai';

const PropertyHeader = ({
  selectedProperty,
  currentUser,
}: {
  selectedProperty: Property;
  currentUser: User | null;
}) => {
  const [isFavorited, setIsFavorited] = useState(
    currentUser?.favoriteIds.includes(selectedProperty.id) ?? false
  );

  return (
    <section className="flex justify-between my-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-head2 font-bold">{selectedProperty.title}</h2>
        <p>{selectedProperty.country}</p>
        <p>{selectedProperty.address}</p>
      </div>
      {selectedProperty.hostId !== currentUser?.id && (
        <button
          className="flex justify-center items-center h-[35px] w-[35px] rounded-xl bg-opacity-20 bg-whiteDark"
          onClick={() => {
            setIsFavorited(true);
            axios.post(`/api/favorites/${selectedProperty.id}`);
          }}
        >
          {isFavorited ? <AiOutlineHeart fill="red" /> : <AiOutlineHeart />}
        </button>
      )}
    </section>
  );
};

export default PropertyHeader;
