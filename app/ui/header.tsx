import { LucideMenu } from "lucide-react";
import { ButtonMenu } from "./button-menu";
import { ButtonDarkMode } from "./button-dark-mode";

type HeaderProps = {
  onOpenMenu: () => void;
};

export const Header = ({ onOpenMenu }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between w-full p-3 h-16 bg-white dark:bg-gray-800 dark:text-white shadow-md fixed top-0 left-0 z-40 md:static md:justify-end md:z-0">
      <ButtonMenu onClick={onOpenMenu}>
        <LucideMenu size={28} />
      </ButtonMenu>

      <ButtonDarkMode />
    </header>
  );
};
