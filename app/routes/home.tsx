import type { Route } from "./+types/home";
import { useSearchParams } from "react-router";

import { getBooks } from "~/services/apiBooks";
import { SearchBar } from "~/components/searchBar";
import { Select } from "~/components/select";
import { BookCard } from "~/components/bookCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader() {
  const books = await getBooks();
  return { books };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const { books } = loaderData;
  // console.log(searchParams.get("nombre"));

  return (
    <div>
      <h1 className="text-2xl font-semibold dark:text-white mb-4">
        Libros disponibles
      </h1>
      <SearchBar />

      <div className="flex items-center gap-2 mt-6">
        {/* <span>Filtrar:</span> */}
        <Select />
      </div>
      {/* <p>Libros que comienzan por {params.get("nombre")}</p> */}
      <h2>Test Libros</h2>
      {books && books.map((book) => <BookCard key={book.id} book={book} />)}
    </div>
  );
}
