import { Filters, Steps } from "@/app/types";
import { Dispatch, ReactElement, SetStateAction } from "react";

export type PopupProps = {
  setFilters: Dispatch<SetStateAction<Filters>>;
  setStep: Dispatch<SetStateAction<Steps | null>>;
};
const Popup = ({ children }: { children: ReactElement }) => {
  return (
    <div className="popup-el absolute top-[110%] left-1/2 translate-x-[-50%] min-w-[160%] p-4 rounded-3xl bg-whiteDarker bg-opacity-75 text-black z-[30]">
      {children}
    </div>
  );
};

export default Popup;
