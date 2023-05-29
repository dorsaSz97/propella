import { getProperties } from '../libs';
import Image from 'next/image';
import { AiOutlineHeart } from 'react-icons/ai';
import FavButton from './FavButton';
import { Property } from '@prisma/client';

const PropertiesList = ({
  mapView,
  properties,
}: {
  mapView: boolean;
  properties: null | Property[];
}) => {
  if (!properties) return null;
  return (
    <ul
      className={`grid ${
        !mapView ? 'grid-cols-4 gap-10' : 'grid-cols-3 gap-7 flex-1'
      }`}
    >
      {properties.map(prop => {
        return (
          <li>
            <div className="relative mb-[1rem]">
              <Image
                src={prop.images[0]}
                alt="property"
                width={400}
                height={400}
                className={`rounded-[12%] object-cover w-full ${
                  mapView ? 'h-[200px]' : 'h-[320px]'
                } `}
              />
              <FavButton id={prop.id} />
            </div>
            <header className="flex justify-between items-center font-bold">
              <h3 className="capitalize">{prop.title}</h3>
              <span>{prop.price} $</span>
            </header>
            <p className="capitalize">{prop.country}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default PropertiesList;
