import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  Query,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "~/firebase/firebaseConfig";
import type { Book } from "~/types/types";

export async function getBooks({
  author,
  genre,
}: {
  author?: string;
  genre?: string;
}) {
  let booksQuery: Query = collection(firestore, "books");

  const constraints = [];

  if (author?.length) {
    constraints.push(where("formattedAuthor", "==", author));
  }
  if (genre?.length) {
    constraints.push(where("formattedGenre", "==", genre));
  }

  if (constraints.length > 0) {
    booksQuery = query(booksQuery, ...constraints);
  }

  const querySnapshot = await getDocs(booksQuery);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Book, "id">),
  }));
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
