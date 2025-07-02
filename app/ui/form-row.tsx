import type { ReactNode } from "react";

type FormRowProps = {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
};

export const FormRow = ({ label, id, error, children }: FormRowProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="dark:text-gray-300">
        {label}
      </label>
      {children}
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  );
};
