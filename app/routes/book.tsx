import type { Route } from "./+types/book";
import type { Book } from "~/types/books";
import { bookLoader } from "~/utils/loaders/loaders";
import { BookDetail } from "~/features/books/book-detail";
import { Message } from "~/ui/message";
import { Container } from "~/ui/container";
import { ButtonHome } from "~/ui/button-home";

export const clientLoader = bookLoader;

export default function Book({ loaderData }: Route.ComponentProps) {
  const result = loaderData;

  if ((result && !result.succeeded) || !result) {
    return (
      <div className="flex flex-col gap-4">
        <ButtonHome />
        <Message
          variant="warning"
          text="No se encontró el libro seleccionado"
        />
      </div>
    );
  }

  const book = result.data;

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
