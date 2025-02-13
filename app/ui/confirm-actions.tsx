import { Button } from "./button";

type ConfirmActions = {
  cancelText?: string;
  confirmText?: string;
  confirmType?: "button" | "submit";
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmActions = ({
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmType = "button",
  onConfirm,
  onCancel,
}: ConfirmActions) => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="destructive" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button type={confirmType} onClick={onConfirm}>
        {confirmText}
      </Button>
    </div>
  );
};
