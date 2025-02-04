import { LucideMenu } from "lucide-react";
import { MenuButton } from "./menuButton";

type HeaderProps = {
  onOpenMenu: () => void;
};

export const Header = ({ onOpenMenu }: HeaderProps) => {
  return (
    <header className="w-full p-4 h-16 bg-white shadow-md fixed top-0 left-0 z-40 md:static">
      <MenuButton onClick={onOpenMenu}>
        <LucideMenu size={28} />
      </MenuButton>
    </header>
  );
};
