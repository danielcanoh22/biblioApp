export type Book = {
  id: number;
  title: string;
  idTitle: number;
  description: string;
  author: string;
  authorId: number;
  genre: string;
  genreId: number;
  copies: number;
  image: string;
  createdAt: string;
};

export type TempBook = {
  author: string;
  titleBook: string;
  description: string;
  copies: number;
  nameGenre: string;
  image: string;
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

export type Column = {
  key: string;
  label: string;
};

export const enum THEMES {
  LIGHT = "light",
  DARK = "dark",
}

//////////////////// API ////////////////////

export interface BooksAPIError {
  succeeded: boolean;
  message: string;
}
export interface BooksAPIResponse {
  data: Book[];
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
