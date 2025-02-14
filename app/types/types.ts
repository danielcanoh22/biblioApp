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

export type Loan = {
  loanId: string;
  bookId: string;
  bookTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: string;
};

export type Column = {
  key: string;
  label: string;
};
