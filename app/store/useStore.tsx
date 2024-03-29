import { create } from "zustand";

type ModalType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};
export const usePropertyModal = create<ModalType>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
