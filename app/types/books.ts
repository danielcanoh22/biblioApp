import type { Pagination } from "./globals";

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

export type BookFilterOption = {
  name: string;
  id: string | number;
};

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

export interface CreateBookApiResponse {
  data: Book;
  succeeded: true;
}
