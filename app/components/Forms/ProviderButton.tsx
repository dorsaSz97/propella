'use client';
import { signIn } from 'next-auth/react';

type ButtonProps = {
  btnIcon: React.ReactElement;
  providerName: string;
};
const ProviderButton = ({ btnIcon, providerName }: ButtonProps) => {
  return (
    <button
      className="flex justify-center items-center h-[75px] w-[75px] rounded-full  bg-silverGrey btn--search"
      onClick={() =>
        signIn(providerName, {
          callbackUrl: 'http://localhost:3000/properties',
        })
      }
    >
      {btnIcon}
    </button>
  );
};

export default ProviderButton;
