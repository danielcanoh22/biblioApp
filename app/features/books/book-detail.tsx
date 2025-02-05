import { useState } from "react";
import type { Book } from "~/types/types";

type BookDetailProps = {
  book: Book;
};

export const BookDetail = ({ book }: BookDetailProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded((expanded) => !expanded);
  };

  return (
    <div>
      <img src={book?.image} alt="" />
      <h4 className="font-semibold text-xl text-gray-700">{book?.title}</h4>
      <div>
        <p
          className={`text-gray-500 ${
            isExpanded ? "line-clamp-none" : "line-clamp-5"
          }`}
        >
          {book?.description}
        </p>
        <button className="" onClick={handleToggleExpand}>
          {isExpanded ? "Ver menos" : "Ver más"}
        </button>
      </div>
    </div>
  );
};
