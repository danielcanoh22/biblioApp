import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import { useState } from "react";
import { useDarkMode } from "~/context/DarkModeContext";
import { THEMES } from "~/types/types";
import { Header } from "~/ui/header";
import { Menu } from "~/ui/menu";

export default function AppLayout() {
  const { theme } = useDarkMode();
  const [showMenu, setShowMenu] = useState(false);

  const toastStyle =
    theme === THEMES.LIGHT
      ? { background: "#ffffff", color: "#101828" }
      : { background: "#1d293d", color: "#ebe6e7" };

  return (
    <div className="h-screen md:grid md:grid-cols-[280px_1fr]">
      <Menu isOpen={showMenu} onClose={() => setShowMenu(false)} />

      <div className="h-full md:grid md:grid-rows-[auto_1fr] md:overflow-y-hidden">
        <Header onOpenMenu={() => setShowMenu(true)} />

        <main className="p-3 pt-20 md:overflow-y-auto md:p-6">
          <Outlet />
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              className: "border border-gray-300 dark:border-gray-700",
              style: toastStyle,
              duration: 5000,
            }}
          />
        </main>
      </div>
    </div>
  );
}
