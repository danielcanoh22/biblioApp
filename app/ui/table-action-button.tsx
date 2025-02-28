import type { ReactNode } from "react";
import { Link } from "react-router";

type TableActionButtonProps = {
  children: ReactNode;
  url?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const buttonBaseStyles =
  "flex justify-center items-center py-2 px-2 w-full cursor-pointer transition-colors duration-200";

export const TableActionButton = ({
  url,
  type = "button",
  onClick,
  children,
}: TableActionButtonProps) => {
  if (url)
    return (
      <Link
        to={url}
        className={`${buttonBaseStyles} text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-500`}
      >
        {children}
      </Link>
    );

  return (
    <button
      type={type}
      className={`${buttonBaseStyles} text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
