"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Property } from "@prisma/client";
import { Gallery } from "../PropertyDetailsClient";

const ImageGallery = ({ selectedProperty }: { selectedProperty: Property }) => {
  const [galleryOption, setGalleryOption] = useState<Gallery>(Gallery.Outside);
  const [bgUrl, setBgUrl] = useState(selectedProperty.images[0]);

  useEffect(() => {
    switch (galleryOption) {
      case Gallery.Outside:
        setBgUrl(selectedProperty.images[0]);
        break;
      case Gallery.Bedroom:
        setBgUrl(selectedProperty.images[3]);
        break;
      case Gallery.Bathroom:
        setBgUrl(selectedProperty.images[2]);
        break;
      case Gallery.Kitchen:
        setBgUrl(selectedProperty.images[1]);
        break;
      default:
        break;
    }
  }, [galleryOption]);
  return (
    <section
      id="tour"
      className="relative rounded-2xl my-12 h-[400px] overflow-hidden"
    >
      <Image
        src={bgUrl}
        alt="apartment room"
        fill={true}
        sizes="700"
        className="absolute top-0 right-0 z-[1] brightness-[65%]"
      />

      <div
        className={`relative z-[2] flex flex-col justify-between h-full p-4`}
      >
        <h3 className="text-head3 mb-2 font-semibold text-white">
          Virtual tour
        </h3>

        <ul className="flex gap-3 self-end">
          <li className="rounded-2xl p-3 bg-opacity-40 bg-silverGrey text-white hover:text-black hover:bg-white">
            <button
              className="w-full h-full flex items-center justify-center"
              onClick={() => setGalleryOption(Gallery.Outside)}
            >
              Outside
            </button>
          </li>
          <li className="rounded-2xl p-3 bg-opacity-40 bg-silverGrey text-white hover:text-black hover:bg-white">
            <button
              className="w-full h-full flex items-center justify-center"
              onClick={() => setGalleryOption(Gallery.Bathroom)}
            >
              Bathroom
            </button>
          </li>
          <li className="rounded-2xl p-3 bg-opacity-40 bg-silverGrey text-white hover:text-black hover:bg-white">
            <button
              className="w-full h-full flex items-center justify-center"
              onClick={() => setGalleryOption(Gallery.Bedroom)}
            >
              Bedroom
            </button>
          </li>
          <li className="rounded-2xl p-3 bg-opacity-40 bg-silverGrey text-white hover:text-black hover:bg-white">
            <button
              className="w-full h-full flex items-center justify-center"
              onClick={() => setGalleryOption(Gallery.Kitchen)}
            >
              Kitchen
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ImageGallery;
