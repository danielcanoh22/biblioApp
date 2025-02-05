import type { Route } from "./+types/books";
import { useSearchParams } from "react-router";

import { getBooks } from "~/services/apiBooks";
import { SearchBar } from "~/ui/search-bar";
import { BooksList } from "~/features/books/books-list";

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

export default function Books({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const { books } = loaderData;

  const query = searchParams.get("titulo");
  const filteredBooks = query
    ? books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      )
    : books;

  return (
    <>
      <h1 className="text-2xl font-semibold dark:text-white mb-4">
        Libros disponibles
      </h1>
      <SearchBar />

      <BooksList books={filteredBooks} />
    </>
  );
}
