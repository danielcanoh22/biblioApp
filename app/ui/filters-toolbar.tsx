import type { Pagination } from "~/types/globals";
import { SearchBar } from "./search-bar";
import { PaginationControls } from "./pagination-controls";

type TableToolbarProps = {
  fieldName: string;
  placeholder: string;
  pagination: Pagination;
};

export const FiltersToolbar = ({
  fieldName,
  placeholder,
  pagination,
}: TableToolbarProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-center">
      <SearchBar field={fieldName} placeholder={placeholder} />
      <div className="lg:justify-self-end lg:w-max">
        <PaginationControls pagination={pagination} />
      </div>
    </div>
  );
};
