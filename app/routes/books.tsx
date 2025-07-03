import type { Route } from "./+types/books";
import { useSearchParams } from "react-router";

import type { Book } from "~/types/types";

import { SearchBar } from "~/ui/search-bar";
import { BooksList } from "~/features/books/books-list";
import { BooksFilter } from "~/features/books/books-filter";
import { PrimaryTitle } from "~/ui/titles";
import { Message } from "~/ui/message";
import { Container } from "~/ui/container";
import { allBooksLoader } from "~/utils/loaders";
import { PaginationControls } from "~/ui/pagination-controls";

const DEFAULT_PAGINATION = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 1,
  limit: 1,
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Librería Michi, +200 libros disponibles para prestar" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const clientLoader = allBooksLoader;

export default function Books({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();

  const result = loaderData;

  if (!result.succeeded && !!result.message)
    return <Message variant="warning" text={`ERROR: ${result.message}`} />;

  const books: Book[] = "data" in result ? result.data?.books : [];
  const pagination =
    "data" in result ? result.data.pagination : DEFAULT_PAGINATION;

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
          <SearchBar
            field="titulo"
            placeholder="Ingresa el nombre de un libro"
          />
          <BooksFilter />
          {totalBooks > 0 ? (
            <>
              <BooksList books={filteredBooks} />
              <div className="w-max justify-self-end">
                <PaginationControls pagination={pagination} />
              </div>
            </>
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
