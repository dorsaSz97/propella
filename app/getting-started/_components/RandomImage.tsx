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
              client_id: process.env.NEXT_PUBLIC_UNSPLASH_KEY,
              query: 'apartment',
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
          priority={true} // setting the lazy loading to false
          fill={true} // setting the position to absolute. no need to set the w and h, its 100% of the parent's.
          src={imageUrl}
          alt="Random image of an apartment"
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
