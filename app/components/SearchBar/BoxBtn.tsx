"use client";
import { Steps } from "@/app/types";
import { Dispatch, useEffect, useState } from "react";

const BoxBtn = ({
  icon,
  step,
  setStep,
  btnStep,
}: {
  btnStep: Steps;
  step: Steps | null;
  setStep: Dispatch<React.SetStateAction<Steps | null>>;
  icon: JSX.Element;
}) => {
  const [isOpen, setOpen] = useState(true);

  useEffect(() => {
    if (step === btnStep) setOpen(false);
    if (step !== btnStep) setOpen(true);
  }, [step]);
  return (
    <div className="flex justify-center items-center h-[4.5rem] w-[4.5rem] rounded-full bg-whiteDarker btn--filter">
      <button
        className="flex justify-center items-center h-[80%] w-[80%] rounded-full bg-whiteLight btn--search"
        onClick={() => {
          isOpen ? setStep(btnStep) : setStep(null);
        }}
      >
        {icon}
      </button>
    </div>
  );
};

export default BoxBtn;
