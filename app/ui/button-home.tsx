import { LucideHome } from "lucide-react";
import { useMoveToHome } from "~/hooks/useMoveToHome";

export const ButtonHome = () => {
  const moveToHome = useMoveToHome();

  return (
    <div
      className="flex items-center gap-1 cursor-pointer w-max text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-500"
      onClick={moveToHome}
    >
      <LucideHome />
      <span>Volver al inicio</span>
    </div>
  );
};
