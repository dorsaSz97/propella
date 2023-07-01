import { Property } from '@prisma/client';
import Image from 'next/image';

const GalleryHeader = ({
  selectedProperty,
}: {
  selectedProperty: Property;
}) => {
  return (
    <section id="gallery" className="my-12">
      <div className="grid grid-cols-5 grid-rows-[150px_150px_150px] gap-4 w-full h-full">
        <Image
          src={selectedProperty.images[0]}
          width={1500}
          height={1500}
          alt="outside"
          className="col-start-1 col-span-3 row-span-3 w-full h-full rounded-3xl object-cover"
        />
        <Image
          src={selectedProperty.images[1]}
          width={800}
          height={800}
          alt="kitchen"
          className="col-start-4 col-span-2 row-span-2 w-full h-full rounded-3xl object-cover"
        />
        <Image
          src={selectedProperty.images[2]}
          width={600}
          height={600}
          alt="bathroom"
          className="w-full h-full rounded-3xl object-cover"
        />
        <Image
          src={selectedProperty.images[3]}
          width={600}
          height={600}
          alt="bedroom"
          className="w-full h-full rounded-3xl object-cover"
        />
      </div>
    </section>
  );
};

export default GalleryHeader;
