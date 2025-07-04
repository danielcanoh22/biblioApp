import type { Route } from "./+types/books";
import { allBooksLoader } from "~/utils/loaders/loaders";
import { useFilteredBooks } from "~/features/books/hooks/useFilteredBooks";
import { BooksList } from "~/features/books/books-list";
import { BooksFilter } from "~/features/books/books-filter";
import { PrimaryTitle } from "~/ui/titles";
import { Message } from "~/ui/message";
import { Container } from "~/ui/container";
import { FiltersToolbar } from "~/ui/filters-toolbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Librería Michi, +200 libros disponibles para prestar" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const clientLoader = allBooksLoader;

export default function Books({ loaderData }: Route.ComponentProps) {
  const result = loaderData;

  if ((result && !result.succeeded) || !result)
    return (
      <Message
        variant="warning"
        text="Ha ocurrido un error al cargar los libros disponibles"
      />
    );

  const { books, pagination, hasBooks, totalBooks } = useFilteredBooks(
    result.data.books,
    result.data.pagination
  );

  return (
    <Container>
      <PrimaryTitle text="Libros disponibles" />
      <FiltersToolbar
        fieldName="title"
        placeholder="Ingresa el nombre de un libro"
        pagination={pagination}
      />
      <BooksFilter />
      {hasBooks ? (
        <>
          {totalBooks > 0 ? (
            <BooksList books={books} />
          ) : (
            <Message
              variant="info"
              text="No hay ningún libro que coincida con los filtros de búsqueda"
            />
          )}
        </>
      ) : (
        <Message
          variant="info"
          text="En este momento no hay ningún libro registrado"
        />
      )}
    </Container>
  );
}
