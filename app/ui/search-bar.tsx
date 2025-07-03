import { LucideSearch } from "lucide-react";
import React from "react";
import { Form, useSearchParams } from "react-router";
import { Button } from "./button";

type SearchBarProps = {
  field: string;
  placeholder: string;
};

export const SearchBar = ({ field, placeholder }: SearchBarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (!value && searchParams.get(field)) {
      searchParams.delete(field);
      setSearchParams(searchParams);
    }
  };

  return (
    <Form>
      <div className="flex flex-col gap-2 max-w-[620px] md:grid md:grid-cols-[1fr_auto]">
        <div className="grid grid-cols-[auto_1fr] gap-2 items-center py-1 px-2 border border-gray-300 rounded-md">
          <LucideSearch className="text-gray-500 dark:text-gray-300" />
          <input
            type="text"
            name={field}
            className="w-full focus:outline-none  px-2 py-1 text-gray-500 dark:text-gray-300 font-light tracking-wide focus:ring-2 focus:ring-indigo-200 dark:placeholder:text-gray-400"
            placeholder={placeholder}
            defaultValue={searchParams.get(field) || ""}
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-max">
          <Button type="submit">Buscar</Button>
        </div>
      </div>
    </Form>
  );
};
