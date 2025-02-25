import type { Route } from "./+types/books";
import { useSearchParams } from "react-router";

import type { Book } from "~/types/types";
import { getBooks } from "~/services/apiBooks";

import { SearchBar } from "~/ui/search-bar";
import { BooksList } from "~/features/books/books-list";
import { BooksFilter } from "~/features/books/books-filter";
import { useFilters } from "~/context/FiltersContext";
import { PrimaryTitle } from "~/ui/titles";
import { Message } from "~/ui/message";
import { Container } from "~/ui/container";
import { allBooksLoader } from "~/utils/loaders";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Librería Michi, +200 libros disponibles para prestar" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const clientLoader = allBooksLoader;

export default function Books({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const { authorOptions, genreOptions } = useFilters();

  const result = loaderData;

  if (!result.succeeded && !!result.message)
    return <Message variant="warning" text={`ERROR: ${result.message}`} />;

  const books: Book[] = "data" in result ? result.data : [];

  const query = searchParams.get("titulo");
  const filteredBooks = query
    ? books.filter((book: Book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      )
    : books;

  const totalBooks = filteredBooks.length;
  const hasBooks =
    totalBooks > 0 ||
    (!totalBooks && (searchParams.get("autor") || searchParams.get("genero")));

  return (
    <Container>
      <PrimaryTitle text="Libros disponibles" />
      {hasBooks ? (
        <>
          <SearchBar />
          <BooksFilter authors={authorOptions} genres={genreOptions} />
          {totalBooks > 0 ? (
            <BooksList books={filteredBooks} />
          ) : (
            <Message
              variant="info"
              text="No hay ningún libro que coincida con los filtros de búsqueda."
            />
          )}
        </>
      ) : (
        <Message
          variant="info"
          text="En este momento no hay ningún libro registrado."
        />
      )}
    </Container>
  );
}
