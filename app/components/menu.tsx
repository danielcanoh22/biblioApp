import { LucideBook, LucideNotebookPen, LucideX } from "lucide-react";
import { NavLink } from "react-router";

import { MenuButton } from "./menuButton";

type MenuProps = {
  isOpen?: boolean;
  onClose: () => void;
};

export const Menu = ({ isOpen, onClose }: MenuProps) => {
  return (
    <>
      {isOpen && (
        <div
          className="w-screen h-screen bg-black/40 fixed top-0 left-0 z-50"
          onClick={onClose}
        ></div>
      )}

      <nav
        className={`flex flex-col gap-4 bg-white w-3xs h-full p-4 fixed top-0 left-0 z-50 transition-transform transform md:translate-x-0 md:static md:w-auto md:shadow-md md:p-6 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <MenuButton onClick={onClose}>
          <LucideX size={28} />
        </MenuButton>

        <NavLink to="/libros" className="flex items-center gap-2 p-2">
          <LucideBook size={20} /> <span>Libros</span>
        </NavLink>
        <NavLink to="/prestamos" className="flex items-center gap-2 p-2">
          <LucideNotebookPen size={20} /> <span>Prestamos</span>
        </NavLink>
      </nav>
    </>
  );
};
