import type { JSX } from "react";
import type { Column } from "~/types/globals";
import { TableHeader } from "./table-header";
import { TableRow } from "./table-row";

type DataTableProps<T> = {
  columns: Column[];
  data: T[];
  actions?: (row: T) => JSX.Element;
};

export const Table = <T,>({ columns, data, actions }: DataTableProps<T>) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-center rtl:text-right text-gray-700 dark:text-gray-300">
        <TableHeader columns={columns} hasActions={!!actions} />
        <tbody>
          {data?.map((row, rowIndex) => (
            <TableRow
              key={`${rowIndex}-${Math.random()}`}
              row={row}
              columns={columns}
              actions={actions}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
