import type { Column } from "~/types/types";
import type { JSX } from "react";

type TableRowProps<T> = {
  row: T;
  columns: Column[];
  actions?: (row: T) => JSX.Element;
};

export const TableRow = <T,>({ row, columns, actions }: TableRowProps<T>) => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
      {columns.map((col) => (
        <td key={col.key} className="px-6 py-4">
          <span
            className={col.key === "description" ? "line-clamp-1 max-w-56" : ""}
          >
            {String(row[col.key as keyof T])}
          </span>
        </td>
      ))}

      {actions && (
        <td className="flex items-center justify-center gap-2 px-6 py-4">
          {actions(row)}
        </td>
      )}
    </tr>
  );
};
