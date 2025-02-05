import { Link } from "react-router";
import type { Book } from "~/types/types";

type BookCardProps = {
  book: Book;
};

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <li className="max-w-36 group cursor-pointer hover:shadow-sm">
      <Link to={`${book.id}`}>
        <div className="max-h-52 overflow-hidden p-2">
          <img
            src={book.image}
            alt={`Portada del libro ${book.title}`}
            className="transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-2 text-center">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
            {book.title}
          </h3>
          <span className="text-sm text-gray-500">{book.author}</span>
        </div>
      </Link>
    </li>
  );
};
