import { useSearchParams } from "react-router";
import type { Book } from "~/types/books";
import type { Pagination } from "~/types/globals";
import { DEFAULT_PAGINATION } from "~/utils/constants/constants";

export const useFilteredBooks = (
  booksData: Book[] | undefined,
  paginationData: Pagination | undefined
) => {
  const [searchParams] = useSearchParams();

  const books = booksData || [];
  const pagination =
    booksData && paginationData && books.length > 0
      ? paginationData
      : DEFAULT_PAGINATION;

  const totalBooks = books.length;

  const hasBooks =
    totalBooks > 0 ||
    (!totalBooks &&
      (searchParams.get("author_id") ||
        searchParams.get("genre_id") ||
        searchParams.get("title")));

  return { books, pagination, hasBooks, totalBooks };
};
