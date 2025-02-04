import { Outlet } from "react-router";
import { useState } from "react";
import { Header } from "~/components/header";
import { Menu } from "~/components/menu";

export default function AppLayout() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="h-screen md:grid md:grid-cols-[280px_1fr]">
      <Menu isOpen={showMenu} onClose={() => setShowMenu(false)} />

      <div className="relative md:grid md:grid-rows-[auto_1fr] md:overflow-y-hidden">
        <Header onOpenMenu={() => setShowMenu(true)} />

        <main className="p-4 pt-20 relative z-10 md:overflow-y-auto md:pt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
