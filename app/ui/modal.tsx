import type { ReactNode } from "react";

type ModalConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalConfirmProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="w-screen h-screen bg-black/50 fixed top-0 left-0 z-10"
        onClick={onClose}
      ></div>
      <div className="bg-white text-gray-700 dark:bg-gray-800 dark:text-white p-4 fixed top-1/2 left-1/2 z-20 -translate-1/2 rounded-md">
        {children}
      </div>
    </>
  );
};
