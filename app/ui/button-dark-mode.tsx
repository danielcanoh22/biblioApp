import { LucideMoon, LucideSun } from "lucide-react";
import { useDarkMode } from "~/context/DarkModeContext";
import { THEMES } from "~/types/types";

export const ButtonDarkMode = () => {
  const { theme, changeTheme } = useDarkMode();

  return (
    <button
      className="cursor-pointer text-indigo-500 rounded-md p-1 focus:ring-2"
      onClick={changeTheme}
    >
      {theme === THEMES.LIGHT ? (
        <LucideMoon size={28} />
      ) : (
        <LucideSun size={28} />
      )}
    </button>
  );
};
