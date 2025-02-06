import { LucideBook, LucideNotebookPen, LucideX } from "lucide-react";

import { ButtonMenu } from "./button-menu";
import { MenuLink } from "./menu-link";

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
        className={`flex flex-col gap-2 bg-white dark:bg-gray-800 dark:text-white w-3xs h-full fixed top-0 left-0 z-50 transition-transform transform md:translate-x-0 md:static md:w-auto md:shadow-md md:p-6 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 p-3 flex items-center md:hidden">
          <ButtonMenu onClick={onClose}>
            <LucideX size={28} />
          </ButtonMenu>
        </div>

        <div className="flex flex-col gap-2 p-3">
          <MenuLink to="/libros" text="Libros">
            <LucideBook size={20} className="text-indigo-600" />
          </MenuLink>
          <MenuLink to="/prestamos" text="Prestamos">
            <LucideNotebookPen size={20} className="text-indigo-600" />
          </MenuLink>
          {/* <NavLink to="/libros" className="flex items-center gap-2 p-2">
            <LucideBook size={20} className="text-indigo-600" />{" "}
            <span>Libros</span>
          </NavLink>
          <NavLink to="/prestamos" className="flex items-center gap-2 p-2">
            <LucideNotebookPen size={20} className="text-indigo-600" />{" "}
            <span>Prestamos</span>
          </NavLink> */}
        </div>
      </nav>
    </>
  );
};
