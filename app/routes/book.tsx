import { getBookById } from "~/services/apiBooks";
import type { Route } from "./+types/book";

import { BookDetail } from "~/features/books/book-detail";
import { Message } from "~/ui/message";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const book = await getBookById(params.bookId);
  return { book };
}

export default function Book({ loaderData }: Route.ComponentProps) {
  const { book } = loaderData;

  if (!book)
    return (
      <Message variant="info" text="No se encontró el libro seleccionado." />
    );

  return <BookDetail book={book} />;
}
