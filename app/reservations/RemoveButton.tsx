"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Reservation } from "@prisma/client";
import { CgClose } from "react-icons/cg";

const RemoveButton = ({ reservation }: { reservation: Reservation }) => {
  const router = useRouter();
  return (
    <button
      className="mx-auto w-fit"
      onClick={() => {
        axios
          .delete(`/api/reservations/${reservation.id}`)
          .then(() => router.refresh());
      }}
    >
      <CgClose size={20} color="red" />
    </button>
  );
};

export default RemoveButton;
