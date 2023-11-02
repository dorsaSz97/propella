import { Spinner } from "@material-tailwind/react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center px-16 py-[1rem] my-[1rem]">
      <Spinner />
    </div>
  );
}
