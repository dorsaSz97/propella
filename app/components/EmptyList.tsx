"use client";
import { useRouter } from "next/navigation";

const EmptyList = ({ infoLabel }: { infoLabel: string }) => {
  const router = useRouter();
  return (
    <div className="flex-1 flex flex-col gap-2 justify-center items-center">
      <p>{infoLabel}</p>
      <button
        className="capitalize underline underline-offset-1 text-grassGreen"
        onClick={() => router.push("/properties")}
      >
        Go to home page
      </button>
    </div>
  );
};

export default EmptyList;
