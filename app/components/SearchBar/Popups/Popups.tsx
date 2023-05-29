import { ReactElement } from 'react';

const Popups = ({ children }: { children: ReactElement }) => {
  return (
    <div className="absolute top-[110%] left-1/2 translate-x-[-50%] w-[160%] p-4 rounded-3xl bg-whiteLight bg-opacity-75 text-black z-[30]">
      {children}
    </div>
  );
};

export default Popups;
