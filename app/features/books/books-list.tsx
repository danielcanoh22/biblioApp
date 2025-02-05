import type { Book } from "~/types/types";
import { BookCard } from "./book-item";

type BooksProps = {
  books: Book[];
};

export const BooksList = ({ books }: BooksProps) => {
  return (
    <section className="mt-6">
      <ul className="flex gap-1 flex-wrap">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </ul>
    </section>
  );
};
