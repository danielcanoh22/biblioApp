import type { Column } from "~/types/types";

type TableHeaderProps = {
  columns: Column[];
  hasActions: boolean;
};

export const TableHeader = ({ columns, hasActions }: TableHeaderProps) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
      <tr>
        {columns.map((col) => (
          <th key={col.key} className="px-6 py-3">
            {col.label}
          </th>
        ))}
        {hasActions && <th className="px-6 py-3">Acciones</th>}
      </tr>
    </thead>
  );
};
