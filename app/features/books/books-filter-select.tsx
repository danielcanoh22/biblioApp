import { useSearchParams } from "react-router";

type OptionType = {
  label: string;
  value: string;
};

type BooksFilterSelectProps = {
  options: OptionType[];
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
      onChange={handleChange}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="dark:bg-dark"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
