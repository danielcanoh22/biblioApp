import { LucideMenu } from "lucide-react";
import { ButtonMenu } from "./button-menu";
import { ButtonDarkMode } from "./button-dark-mode";
import { Button } from "./button";
import { useAuth } from "~/context/AuthContext";
import { useNavigate } from "react-router";

type HeaderProps = {
  onOpenMenu: () => void;
};

export const Header = ({ onOpenMenu }: HeaderProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between w-full p-3 h-16 bg-white dark:bg-gray-800 dark:text-white dark:border-b dark:border-gray-700 shadow-md fixed top-0 left-0 z-40 md:static md:justify-end md:z-0">
      <ButtonMenu onClick={onOpenMenu}>
        <LucideMenu size={28} />
      </ButtonMenu>

      <div className="flex items-center gap-4">
        <ButtonDarkMode />
        <Button onClick={handleLogout}>Cerrar sesión</Button>
      </div>
    </header>
  );
};
