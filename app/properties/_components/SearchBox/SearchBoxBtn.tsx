'use client';

import { Dispatch, useEffect, useState } from 'react';
import { Steps } from './SearchBox';

const SearchBoxBtn = ({
  icon,
  currentStep,
  setCurrentStep,
  btnStep,
}: {
  setCurrentStep: Dispatch<React.SetStateAction<Steps | null>>;
  currentStep: Steps | null;
  btnStep: Steps;
  icon: JSX.Element;
}) => {
  const [isOpen, setOpen] = useState(true);

  useEffect(() => {
    if (currentStep === btnStep) setOpen(false);
    if (currentStep !== btnStep) setOpen(true);
  }, [currentStep]);

  return (
    <div className="flex justify-center items-center h-[4.5rem] w-[4.5rem] rounded-full bg-whiteDarker btn--filter">
      <button
        className="flex justify-center items-center h-[80%] w-[80%] rounded-full bg-whiteLight"
        onClick={() => {
          isOpen ? setCurrentStep(btnStep) : setCurrentStep(null);
        }}
      >
        {icon}
      </button>
    </div>
  );
};

export default SearchBoxBtn;
