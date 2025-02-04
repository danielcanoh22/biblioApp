import { collection, getDocs } from "firebase/firestore";
import { firestore } from "~/firebase/firebaseConfig";
import type { Book } from "~/types/types";

export async function getBooks() {
  const querySnapshot = await getDocs(collection(firestore, "books"));

  const books = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Book, "id">),
  }));

  return books;
}
