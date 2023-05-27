import React, { ReactElement } from 'react';

const Popups = ({ children }: { children: ReactElement }) => {
  return (
    <div className="absolute top-[110%] left-1/2 translate-x-[-50%] w-[110%] p-5 rounded-3xl bg-whiteLight text-black z-[30]">
      {children}
    </div>
  );
};

export default Popups;
