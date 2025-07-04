import { useSearchParams } from "react-router";
import type { BookFilterOption } from "~/types/books";

const enum FILTERS {
  AUTHOR = "author_id",
  GENRE = "genre_id",
}

type BooksFilterSelectProps = {
  options: BookFilterOption[];
  paramName: string;
};

export const BooksFilterSelect = ({
  options,
  paramName,
}: BooksFilterSelectProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;

    if (selectedId.length > 0) {
      searchParams.set(paramName, selectedId);
      searchParams.delete("page");
    } else searchParams.delete(paramName);

    setSearchParams(searchParams);
  };

  return (
    <select
      className="border-b border-gray-300 text-sm p-1 cursor-pointer dark:text-gray-300"
      title={`Filtrar por ${paramName}`}
      defaultValue={
        paramName === FILTERS.AUTHOR
          ? searchParams.get(FILTERS.AUTHOR) || ""
          : searchParams.get(FILTERS.GENRE) || ""
      }
      onChange={handleChange}
    >
      <option value="" className="dark:bg-dark">
        Seleccionar un valor...
      </option>
      {options.map((option) => (
        <option
          key={option.id}
          value={option.id}
          data-author={option.name}
          className="dark:bg-dark"
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};
