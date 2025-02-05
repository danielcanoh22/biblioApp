import { LucideMoon, LucideSun } from "lucide-react";
import { useEffect, useState } from "react";

const enum THEMES {
  LIGHT = "light",
  DARK = "dark",
}

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem("booksTheme");
  if (storedTheme) {
    return storedTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEMES.DARK
    : THEMES.LIGHT;
};

export const DarkModeButton = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  const handleChangeTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  };

  useEffect(() => {
    if (theme === THEMES.LIGHT) {
      document.querySelector("html")?.classList.remove("dark");
    } else {
      document.querySelector("html")?.classList.add("dark");
    }

    localStorage.setItem("booksTheme", theme);
  }, [theme]);

  return (
    <button
      className="cursor-pointer text-indigo-500 rounded-md p-1 focus:ring-2"
      onClick={handleChangeTheme}
    >
      {theme === THEMES.LIGHT ? (
        <LucideMoon size={28} />
      ) : (
        <LucideSun size={28} />
      )}
    </button>
  );
};
