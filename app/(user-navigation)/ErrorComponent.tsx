import { useRouter } from 'next/navigation';
import React from 'react';

const ErrorComponent = ({ message }: { message: string }) => {
  const router = useRouter();
  return (
    <div className="flex-1 flex flex-col gap-2 justify-center items-center">
      <h2 className="font-bold capitalize text-head2">{message}</h2>
      <button
        className="capitalize underline underline-offset-3 text-grassGreen"
        onClick={() => router.back()}
      >
        go back
      </button>
    </div>
  );
};

export default ErrorComponent;
