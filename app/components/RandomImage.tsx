'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
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
    <>
      {imageUrl ? (
        <Image
          priority={true}
          fill={true} // setting the position to absolute. no need to set the w and h, its 100% of the parent's.
          src={imageUrl}
          alt="Random image of an appartment"
          className="object-cover"
          // placeholder='blur'
          // blurDataURL=''
        />
      ) : (
        <div className="w-full h-full bg-silverGrey bg-opacity-40 animate-pulse" />
      )}
    </>
  );
};

export default RandomImage;
