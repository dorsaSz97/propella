import { Dispatch, ReactElement, SetStateAction } from 'react';
import { Property } from '@prisma/client';
import { Filters, Steps } from '@/app/properties/PropertiesClient';

export type PopupProps = {
  setFilters: Dispatch<SetStateAction<Filters>>;
  setStep: Dispatch<SetStateAction<Steps | null>>;
  properties?: Property[];
};

const Popup = ({ children }: { children: ReactElement }) => {
  return (
    <div className="absolute top-[110%] left-1/2 translate-x-[-50%] min-w-[120%] p-4 rounded-3xl z-[30] text-black bg-[#f3f3f354] bg-opacity-80 backdrop-blur-[25px]">
      {children}
    </div>
  );
};

export default Popup;
