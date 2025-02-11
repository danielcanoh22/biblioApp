import type { ReactNode } from "react";

type FormRowProps = {
  label: string;
  id: string;
  children: ReactNode;
};

export const FormRow = ({ label, id, children }: FormRowProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="dark:text-gray-300">
        {label}
      </label>
      {children}
    </div>
  );
};
