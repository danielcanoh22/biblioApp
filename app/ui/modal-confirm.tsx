import type { ReactNode } from "react";
import { Button } from "./button";

type ModalConfirmProps = {
  isOpen: boolean;
  children: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ModalConfirm = ({
  isOpen,
  children,
  onConfirm,
  onCancel,
}: ModalConfirmProps) => {
  if (!isOpen) return null;

  return (
    <div className="w-screen h-screen bg-black/40 fixed top-0 left-0">
      <div className="bg-white text-gray-700 dark:bg-gray-800 dark:text-white p-4 fixed top-1/2 left-1/2 -translate-1/2 flex flex-col gap-4 text-center rounded-md">
        {children}
        <div className="flex items-center gap-2">
          <Button variant="destructive" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Confirmar</Button>
        </div>
      </div>
    </div>
  );
};
