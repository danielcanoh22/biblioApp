import type { ReactNode } from "react";
import { NavLink } from "react-router";

type MenuLinkProps = {
  to: string;
  text: string;
  children: ReactNode;
};

export const MenuLink = ({ to, text, children }: MenuLinkProps) => {
  return (
    <NavLink
      to={to}
      className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-dark"
    >
      {children} <span>{text}</span>
    </NavLink>
  );
};
