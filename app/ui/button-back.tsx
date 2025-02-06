import { LucideChevronLeft } from "lucide-react";
import { useMoveBack } from "~/hooks/useMoveBack";

export const ButtonBack = () => {
  const moveBack = useMoveBack();

  return (
    <div
      className="flex items-center gap-1 cursor-pointer w-max text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-500"
      onClick={moveBack}
    >
      <LucideChevronLeft />
      <span>Volver atrás</span>
    </div>
  );
};
