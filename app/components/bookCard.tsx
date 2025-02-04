import type { Book } from "~/types/types";

type BookCardProps = {
  book: Book;
};

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="border w-60">
      <img src={book.image} alt={`Portada del libro ${book.title}`} />
      <h3>{book.title}</h3>
      <span>{book.author}</span>
      <span>{book.price}</span>
    </div>
  );
};
