import type { Timestamp } from "firebase/firestore";

export type Book = {
  id: string;
  title: string;
  description: string;
  author: string;
  copies: number;
  image: string;
  created_at: Timestamp;
};
