import type { Route } from "./+types/book";
import type { Book } from "~/types/types";

import { BookDetail } from "~/features/books/book-detail";
import { Message } from "~/ui/message";
import { Container } from "~/ui/container";
import { bookLoader } from "~/utils/loaders";

export const clientLoader = bookLoader;

export default function Book({ loaderData }: Route.ComponentProps) {
  const result = loaderData;

  const book: Book | null = "data" in result ? result.data : null;

  return (
    <Container>
      {book ? (
        <BookDetail book={book} />
      ) : (
        <Message variant="info" text="No se encontró el libro seleccionado." />
      )}
    </Container>
  );
}
