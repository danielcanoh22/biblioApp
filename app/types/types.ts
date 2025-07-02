export type Book = {
  id?: number;
  title: string;
  author?: string;
  author_id?: number | string;
  genre?: string;
  genre_id?: number | string;
  description: string;
  total_copies?: number;
  available_copies: number;
  image: string;
  created_at?: string;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
};

export type Request = {
  id: string;
  userId?: string;
  userName: string;
  userEmail: string;
  bookId?: string;
  bookTitle: string;
  requestDate: string;
  status: string;
};

export type Loan = {
  id: string;
  bookTitle: string;
  userName: string;
  userEmail: string;
  comments?: string;
  status: string;
  loanDate: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  rol: string;
};

export type BookFilterOption = {
  name: string;
  id: string | number;
};

export type BooksFilterProps = {
  authors: BookFilterOption[];
  genres: BookFilterOption[];
};

export type Column = {
  key: string;
  label: string;
};

export const enum THEMES {
  LIGHT = "light",
  DARK = "dark",
}

//////////////////// API ////////////////////

export interface APIError {
  succeeded: false;
  message: string;
}
export interface BooksAPIResponse {
  data: {
    books: Book[];
    pagination: Pagination;
  };
  succeeded: boolean;
  errors?: null;
  message?: null;
}

export interface BookAPIResponse {
  data: Book;
  succeeded: boolean;
  errors?: null;
  message?: null;
}
