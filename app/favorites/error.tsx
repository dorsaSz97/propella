"use client"; // Error component must be Client Components

import { useRouter } from "next/navigation";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col gap-2 justify-center items-center">
      <h2 className="font-bold capitalize text-head2">{error.message}</h2>
      <button
        className="capitalize underline underline-offset-3 text-grassGreen"
        onClick={() => router.back()}
      >
        go back
      </button>
    </div>
  );
}
