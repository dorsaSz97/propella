'use client';
import Image from 'next/image';
import { Property } from '@prisma/client';
import FavButton from './FavButton';
import { useRouter } from 'next/navigation';

// ${
//   mapView ? 'h-[200px]' : 'h-[320px]'
// }

const PropertyCard = ({ property }: { property: Property }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/properties/${property.id}`);
      }}
    >
      <div className="relative mb-[1rem]">
        <Image
          src={property.images[0]}
          alt="property"
          width={400}
          height={400}
          className={`rounded-[12%] object-cover w-full 
        
          `}
        />
        <FavButton id={property.id} />
      </div>
      <header className="flex justify-between items-center font-bold">
        <h3 className="capitalize">{property.title}</h3>
        <span>{property.price} $</span>
      </header>
      <p className="capitalize">{property.country}</p>
    </div>
  );
};

export default PropertyCard;
