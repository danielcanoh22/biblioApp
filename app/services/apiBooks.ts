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

// export async function getBooks({
//   author,
//   genre,
// }: {
//   author?: string;
//   genre?: string;
// }) {
//   let booksQuery: Query = collection(firestore, "books");

//   const constraints = [];

//   if (author?.length) {
//     constraints.push(where("formattedAuthor", "==", author));
//   }
//   if (genre?.length) {
//     constraints.push(where("formattedGenre", "==", genre));
//   }

//   if (constraints.length > 0) {
//     booksQuery = query(booksQuery, ...constraints);
//   }

//   const querySnapshot = await getDocs(booksQuery);

//   return querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...(doc.data() as Omit<Book, "id">),
//   }));
// }

export async function getBooks({
  author,
  genre,
}: {
  author?: string;
  genre?: string;
}) {
  const response = await fetch(
    "https://localhost:7082/api/Books/RegisteredBooks"
  );

  if (!response.ok) throw new Error("No se encontraron los libros");

  const books = await response.json();

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

export async function createBook(book) {
  const response = await fetch(
    "https://localhost:7082/api/Books/RegisterBook",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    }
  );

  if (!response.ok) throw new Error("No se pudo crear el libro.");

  const bookRes = await response.json();

  return bookRes;
}
