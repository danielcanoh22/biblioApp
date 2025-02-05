import type { ReactNode } from "react";

type MenuButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export const MenuButton = ({ onClick, children }: MenuButtonProps) => {
  return (
    <button className="cursor-pointer w-max p-1 md:hidden" onClick={onClick}>
      {children}
    </button>
  );
};
