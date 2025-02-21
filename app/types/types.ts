import type { Timestamp } from "firebase/firestore";

export type Book = {
  id: string;
  title: string;
  description: string;
  author: string;
  genre: string;
  copies: number;
  image: string;
  created_at: Timestamp;
  formattedAuthor: string;
  formattedGenre: string;
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
