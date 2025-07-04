import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { THEMES } from "~/types/globals";

type DarkModeContextType = {
  theme: string;
  changeTheme: () => void;
};

type DarkModeProviderProps = {
  children: ReactNode;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem("booksTheme");
  if (storedTheme) {
    return storedTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEMES.DARK
    : THEMES.LIGHT;
};

export function DarkModeProvider({ children }: DarkModeProviderProps) {
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
    <DarkModeContext.Provider value={{ theme, changeTheme: handleChangeTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("useDarkMode debe usarse dentro de DarkModeProvider");

  return context;
}
