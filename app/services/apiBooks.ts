import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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

export async function getBookById(bookId: string) {
  const docRef = doc(firestore, "books", bookId);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return {
      id: docSnapshot.id,
      ...(docSnapshot.data() as Omit<Book, "id">),
    };
  } else {
    return null;
  }
}
