import type { ReactNode } from "react";

type TypeButton = "button" | "submit" | "reset";

type VariantButton = "primary" | "destructive";

type ButtonProps = {
  type?: TypeButton;
  children: ReactNode;
  variant?: VariantButton;
  onClick?: () => void;
};

export const Button = ({
  type = "button",
  variant = "primary",
  onClick,
  children,
}: ButtonProps) => {
  const baseStyles =
    "text-white py-2 px-4 rounded-md w-full cursor-pointer transition-colors duration-200";

  const variantStyles = {
    primary: `${baseStyles} bg-indigo-600 hover:bg-indigo-800`,
    destructive: `${baseStyles} bg-red-600 hover:bg-red-900`,
  };

  return (
    <button className={variantStyles[variant]} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
