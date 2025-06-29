import { useNavigate } from "react-router";
import { useState } from "react";

import type { Book } from "~/types/types";
import { ButtonBack } from "~/ui/button-back";
import { Button } from "~/ui/button";
import { Message } from "~/ui/message";
import { Modal } from "~/ui/modal";
import { ConfirmActions } from "~/ui/confirm-actions";

type BookDetailProps = {
  book: Book;
};

export const BookDetail = ({ book }: BookDetailProps) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBorrowed, setIsBorrowed] = useState(false);

  const isAvailable = book.available_copies > 0;

  const handleToggleExpand = () => {
    setIsExpanded((expanded) => !expanded);
  };

  const handleLendBook = () => {
    navigate("prestamo");
  };

  return (
    <>
      <div className="p-2 flex flex-col gap-4">
        <ButtonBack />

        <div className="grid gap-6 mt-6 lg:grid-cols-[auto_1fr] lg:gap-10">
          <div className="flex flex-col items-center gap-6 lg:mt-0">
            <img
              src={book?.image}
              alt={`Portada del libro ${book?.title}`}
              className="w-48 max-w-60 ring-4 ring-indigo-300 ring-offset-4 rounded-md lg:w-auto"
            />

            <span
              className={`${
                isAvailable
                  ? "bg-green-300 text-green-950"
                  : "bg-red-300 text-red-950"
              } py-1 px-4 font-medium rounded-lg text-sm md:text-base`}
            >
              {isAvailable ? "Disponible" : "No disponible"}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-xl text-gray-700 dark:text-gray-300 mb-4">
              {book?.title}
            </h4>
            <div className="flex flex-col gap-2 mb-6 lg:gap-6">
              <p
                className={`text-gray-500 dark:text-gray-400 lg:line-clamp-none ${
                  isExpanded ? "line-clamp-none" : "line-clamp-5"
                }`}
              >
                {book?.description}
              </p>
              <button
                className="w-max self-end cursor-pointer text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-500 lg:hidden"
                onClick={handleToggleExpand}
              >
                {isExpanded ? "Ver menos" : "Ver más"}
              </button>

              <p className="text-gray-700 dark:text-gray-300 font-semibold">
                Autor:{" "}
                <span className="font-normal italic text-gray-500 dark:text-gray-400">
                  {book?.author}
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-300 font-semibold">
                Género:{" "}
                <span className="font-normal italic text-gray-500 dark:text-gray-400">
                  {book?.genre}
                </span>
              </p>
            </div>

            <div className="flex">
              {isAvailable ? (
                <div className="w-full lg:w-40 lg:justify-self-end">
                  <Button onClick={() => setIsBorrowed(true)}>
                    Prestar libro
                  </Button>
                </div>
              ) : (
                <Message
                  variant="info"
                  text="Lo sentimos, este libro no está disponible para préstamo en este momento."
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isBorrowed} onClose={() => setIsBorrowed(false)}>
        <p className="text-center mb-4">
          ¿Deseas prestar el libro{" "}
          <span className="font-semibold">{book.title}</span>?
        </p>
        <ConfirmActions
          onConfirm={handleLendBook}
          onCancel={() => setIsBorrowed(false)}
        />
      </Modal>
    </>
  );
};
