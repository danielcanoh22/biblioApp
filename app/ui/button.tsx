import type { ReactNode } from "react";
import { Link } from "react-router";

type TypeButton = "button" | "submit" | "reset";

type VariantButton = "primary" | "destructive";

type ButtonProps = {
  type?: TypeButton;
  variant?: VariantButton;
  isDisabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

export const Button = ({
  type = "button",
  isDisabled = false,
  variant = "primary",
  onClick,
  children,
}: ButtonProps) => {
  const baseStyles =
    "flex justify-center items-center text-white py-2 px-3 rounded-md w-full cursor-pointer transition-colors duration-200 disabled:bg-gray-400 dark:disabled:bg-gray-700";

  const variantStyles = {
    primary: `${baseStyles} bg-indigo-600 hover:bg-indigo-800`,
    destructive: `${baseStyles} bg-red-600 hover:bg-red-900`,
  };

  return (
    <button
      className={variantStyles[variant]}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
