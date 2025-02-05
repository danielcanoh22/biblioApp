import { LucideSearch } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [bookName, setBookName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bookName) return;
    searchParams.set("titulo", bookName);
    setSearchParams(searchParams);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setBookName(value);

    if (!value && searchParams.get("titulo")) {
      searchParams.delete("titulo");
      setSearchParams(searchParams);
      navigate("/libros");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[auto_1fr] gap-2 items-center py-1 px-2 border border-gray-300 rounded-md">
          <LucideSearch className="text-gray-500 dark:text-gray-300" />
          <input
            type="text"
            className="w-full focus:outline-none  px-2 py-1 text-gray-500 dark:text-gray-300 font-light tracking-wide focus:ring-2 focus:ring-indigo-200 dark:placeholder:text-gray-400"
            placeholder="Ingresa el nombre de un libro"
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded-md cursor-pointer w-max transition-colors duration-200 hover:bg-indigo-800"
          type="submit"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};
