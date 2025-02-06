import type { Route } from "./+types/books";
import { useSearchParams } from "react-router";

import { getBooks } from "~/services/apiBooks";
import { SearchBar } from "~/ui/search-bar";
import { BooksList } from "~/features/books/books-list";
import { BooksFilter } from "~/features/books/books-filter";
import { formatCharacteristic } from "~/utils/helpers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader() {
  const books = await getBooks();

  const uniqueAuthors = Array.from(
    new Set(books.map((book) => book.author))
  ).map((author) => ({
    label: author,
    value: formatCharacteristic(author),
  }));

  const uniqueGenres = Array.from(new Set(books.map((book) => book.genre))).map(
    (author) => ({
      label: author,
      value: formatCharacteristic(author),
    })
  );

  const authorOptions = [
    { label: "Seleccionar un autor", value: "" },
    ...uniqueAuthors,
  ];

  const genreOptions = [
    { label: "Seleccionar un género", value: "" },
    ...uniqueGenres,
  ];

  return { books, authorOptions, genreOptions };
}

export default function Books({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const { books, authorOptions, genreOptions } = loaderData;

  const query = searchParams.get("q");
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
      <BooksFilter authors={authorOptions} genres={genreOptions} />
      <BooksList books={filteredBooks} />
    </>
  );
}
