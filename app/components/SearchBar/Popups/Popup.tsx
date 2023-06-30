import { Dispatch, ReactElement, SetStateAction } from "react";
import { Filters, Steps } from "@/app/types";
import { Property } from "@prisma/client";

export type PopupProps = {
  setFilters: Dispatch<SetStateAction<Filters>>;
  setStep: Dispatch<SetStateAction<Steps | null>>;
  properties?: Property[];
};

const Popup = ({ children }: { children: ReactElement }) => {
  return (
    <div className="popup-el absolute top-[110%] left-1/2 translate-x-[-50%] min-w-[120%] p-4 rounded-3xl bg-[#f3f3f354] bg-opacity-80 backdrop-blur-[25px] text-black z-[30]">
      {children}
    </div>
  );
};

export default Popup;
