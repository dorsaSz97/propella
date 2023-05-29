'use client'
import { AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';
const FavButton = ({id}: {id: string}) => {
  // const [isFavorited, setIsFavorited] = useState(
  //   currentUser?.favoriteIds.includes(id)
  // );

  return (
    <button className="absolute h-[35px] w-[35px] flex justify-center items-center bg-silverGrey rounded-lg bg-opacity-25 top-6 right-6 z-[10]" onClick={() => axios.post(`/api/favorite/${id}`)}>
      <AiOutlineHeart />
    </button>
  );
};

export default FavButton;
