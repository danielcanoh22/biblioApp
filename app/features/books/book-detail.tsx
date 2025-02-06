import { useState } from "react";
import type { Book } from "~/types/types";
import { ButtonBack } from "~/ui/button-back";
import { Button } from "~/ui/button";
import { Message } from "~/ui/message";
import { createLoan } from "~/services/apiLoans";

type BookDetailProps = {
  book: Book;
};

export const BookDetail = ({ book }: BookDetailProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isAvailable = book.copies > 0;

  const handleToggleExpand = () => {
    setIsExpanded((expanded) => !expanded);
  };

  return (
    <div className="p-2 flex flex-col gap-4">
      <ButtonBack />

      <div className="flex flex-col items-center gap-6 mt-6">
        <img
          src={book?.image}
          alt={`Portada del libro ${book?.title}`}
          className="w-48 ring-4 ring-indigo-300 ring-offset-4 rounded-md"
        />

        <span
          className={`${
            isAvailable
              ? "bg-green-300 text-green-950"
              : "bg-red-300 text-red-950"
          } py-1 px-4 font-medium rounded-lg text-sm `}
        >
          {isAvailable ? "Disponible" : "No disponible"}
        </span>
      </div>
      <div>
        <h4 className="font-semibold text-xl text-gray-700 dark:text-gray-300 mb-4">
          {book?.title}
        </h4>
        <div className="flex flex-col gap-2 mb-6">
          <p
            className={`text-gray-500 dark:text-gray-400 ${
              isExpanded ? "line-clamp-none" : "line-clamp-5"
            }`}
          >
            {book?.description}
          </p>
          <button
            className="w-max self-end cursor-pointer text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-500"
            onClick={handleToggleExpand}
          >
            {isExpanded ? "Ver menos" : "Ver más"}
          </button>
        </div>

        <div className="flex justify-center">
          {isAvailable ? (
            <Button
              type="button"
              text="Prestar libro"
              onClick={() => createLoan(book.id, "TEST123")}
            />
          ) : (
            <Message
              variant="info"
              text="Lo sentimos, este libro no está disponible para préstamo en este momento."
            />
          )}
        </div>
      </div>
    </div>
  );
};
