'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RandomImage = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response: { data: { urls: { regular: string } } } =
          await axios.get('https://api.unsplash.com/photos/random', {
            params: {
              client_id: 'PLRhf3GZuX4rsXKj2Lgf_lc656eRnjDoM8Ak1N3fKVk',
              query: 'appartment',
            },
          });
        setImageUrl(response.data.urls.regular);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Image
      src={imageUrl}
      fill={true} // setting the position to relative. no need to set the w and h
      priority={true}
      alt="Random image of an appartment"
      className="object-cover"
    />
  );
};

export default RandomImage;
