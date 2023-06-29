"use client";

import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";

const FavButton = ({
  relPropId,
  isFilled,
  setIsFavorited,
}: {
  relPropId: string;
  isFilled: boolean;
  setIsFavorited: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/homes") return null;

  return (
    <button
      className="absolute flex justify-center items-center h-[35px] w-[35px] rounded-lg top-6 right-6 z-[10] bg-silverGrey bg-opacity-75"
      onClick={(e) => {
        e.stopPropagation(); // stopping the click to fav, trigger the opening of detail page

        if (isFilled) {
          axios.delete(`/api/favorites/${relPropId}`).then(() => {
            setIsFavorited(false);
            if (pathname === "/favorites") router.refresh();
          });
        } else {
          axios.post(`/api/favorites/${relPropId}`).then(() => {
            setIsFavorited(true);
          });
        }
      }}
    >
      {isFilled ? <AiOutlineHeart fill="red" /> : <AiOutlineHeart />}
    </button>
  );
};

export default FavButton;
