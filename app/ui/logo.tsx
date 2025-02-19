import { useDarkMode } from "~/context/DarkModeContext";
import { THEMES } from "~/types/types";

export const Logo = () => {
  const { theme } = useDarkMode();

  return (
    <img
      src={theme === THEMES.LIGHT ? "/logo-light.png" : "/logo-dark.png"}
      alt="Logo de la Librería Michi"
      className="w-20"
    />
  );
};
