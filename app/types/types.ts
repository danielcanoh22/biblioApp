import type { Timestamp } from "firebase/firestore";

export type Book = {
  id: string;
  title: string;
  author: string;
  copies: number;
  price: number;
  image: string;
  created_at: Timestamp;
};
