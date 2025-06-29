import type { BookFilterOption } from "~/types/types";

type SelectProps = {
  options: BookFilterOption[];
  id: string;
};

export const Select = ({ options, id }: SelectProps) => {
  return (
    <select
      id={id}
      name={id}
      className="border border-gray-300  w-full p-2 rounded-md cursor-pointer text-gray-600 dark:text-gray-300 text-md focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:ring-offset-2"
    >
      {options.map((option) => (
        <option key={option.value} value={option.label} className="bg-gray-700">
          {option.label}
        </option>
      ))}
    </select>
  );
};
