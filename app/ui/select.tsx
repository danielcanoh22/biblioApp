import type React from "react";
import { forwardRef } from "react";
import type { BookFilterOption } from "~/types/types";

type SelectProps = React.ComponentPropsWithoutRef<"select"> & {
  options: BookFilterOption[];
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, defaultValue, ...props }, ref) => {
    return (
      <select
        ref={ref}
        {...props}
        defaultValue={defaultValue ?? ""}
        className="border border-gray-300  w-full p-2 rounded-md cursor-pointer text-gray-600 dark:text-gray-300 text-md focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:ring-offset-2"
      >
        <option value="" className="dark:bg-gray-700">
          Selecciona una opción...
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            className="dark:bg-gray-700"
          >
            {option.name}
          </option>
        ))}
      </select>
    );
  }
);
