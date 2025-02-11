import type { Route } from "./+types/books";
import { useSearchParams } from "react-router";

import { getBooks } from "~/services/apiBooks";

import { SearchBar } from "~/ui/search-bar";
import { BooksList } from "~/features/books/books-list";
import { BooksFilter } from "~/features/books/books-filter";
import { useFilters } from "~/context/FiltersContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Librería Michi, +200 libros disponibles para prestar" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const author = url.searchParams.get("autor") || "";
  const genre = url.searchParams.get("genero") || "";
  const books = await getBooks({ author, genre });

  return { books };
}

export default function Books({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const { books } = loaderData;
  const { authorOptions, genreOptions, loaded } = useFilters();

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
      <BooksFilter authors={authorOptions} genres={genreOptions} />
      <BooksList books={filteredBooks} />
    </>
  );
}
