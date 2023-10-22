import { Property } from "@prisma/client";
import Image from "next/image";

const GalleryHeader = ({
  selectedProperty,
}: {
  selectedProperty: Property;
}) => {
  return (
    <section id="gallery" className="my-12">
      <div className="grid lg:grid-cols-5 grid-cols-3 grid-rows-[150px_150px_150px] gap-2 lg:gap-4 w-full h-full">
        <Image
          src={selectedProperty.images[0]}
          width={1500}
          height={1500}
          alt="outside"
          className="lg:col-start-1 lg:col-span-3 col-start-1 col-span-3 row-span-2 lg:row-span-3 w-full h-full rounded-3xl object-cover"
        />
        <Image
          src={selectedProperty.images[1]}
          width={800}
          height={800}
          alt="kitchen"
          className="col-start-1 lg:col-start-4 lg:col-span-2 lg:row-span-2 w-full h-full rounded-3xl object-cover"
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
