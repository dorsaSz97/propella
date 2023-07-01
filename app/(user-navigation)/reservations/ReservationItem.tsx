import Image from 'next/image';
import { Reservation } from '@prisma/client';
import { getSelectedProperty } from '@/app/libs';
import RemoveButton from './RemoveButton';

const ReservationItem = async ({ item }: { item: Reservation }) => {
  const selectedProperty = await getSelectedProperty(item.propertyId);
  if (!selectedProperty) return null;

  return (
    <li className="grid grid-cols-resList items-center justify-between gap-x-6 h-[180px] font-semibold text-body-sm text-center">
      <Image
        src={selectedProperty.images[0]}
        alt="property"
        width={700}
        height={700}
        className={`h-full w-full rounded-2xl object-cover`}
      />
      <p>{item.peopleStaying}</p>
      <p>{item.startDate.toDateString()}</p>
      <p>{item.endDate.toDateString()}</p>
      <span>${item.totalPrice}</span>
      <RemoveButton reservation={item} />
    </li>
  );
};

export default ReservationItem;
