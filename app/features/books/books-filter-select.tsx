import { useSearchParams } from "react-router";
import type { BookFilterOption } from "~/types/types";

const enum FILTERS {
  AUTHOR = "autor",
  GENRE = "genero",
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
    const value = e.target.value;

    if (value.length > 0) searchParams.set(paramName, value);
    else searchParams.delete(paramName);

    setSearchParams(searchParams);
  };

  return (
    <select
      className="border-b border-gray-300 text-sm p-1 cursor-pointer dark:text-gray-300"
      defaultValue={
        paramName === FILTERS.AUTHOR
          ? searchParams.get(FILTERS.AUTHOR) || ""
          : searchParams.get(FILTERS.GENRE) || ""
      }
      onChange={handleChange}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          label={option.label}
          className="dark:bg-dark"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
