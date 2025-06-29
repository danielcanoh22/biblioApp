import type { BooksFilterProps } from "~/types/types";
import { BooksFilterSelect } from "./books-filter-select";

export const BooksFilter = ({ authors, genres }: BooksFilterProps) => {
  return (
    <div className="my-6 flex flex-col gap-2 dark:text-gray-300 w-max">
      <span className="text-gray-600 dark:text-gray-300 font-semibold">
        Filtrar
      </span>
      <div className="flex flex-col gap-4 w-max text-sm sm:flex-row">
        <div className="flex items-center gap-2 w-max">
          <span>Autor:</span>
          <BooksFilterSelect options={authors} paramName="autor_id" />
        </div>
        <div className="flex items-center gap-2 w-max">
          <span>Género:</span>
          <BooksFilterSelect options={genres} paramName="genero_id" />
        </div>
      </div>
    </div>
  );
};
