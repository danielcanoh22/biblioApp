import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  Query,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "~/firebase/firebaseConfig";
import type { Book } from "~/types/types";
import { formatCharacteristic } from "~/utils/helpers";

type GetBooksResponse =
  | { success: true; data: Book[] }
  | { success: false; message: string };

// export async function getBooks({
//   author,
//   genre,
// }: {
//   author?: string;
//   genre?: string;
// }): Promise<GetBooksResponse> {
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
//   const data = querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...(doc.data() as Omit<Book, "id">),
//   }));

//   return { success: true, data };
// }

export async function getBooks({
  author,
  genre,
}: {
  author?: string;
  genre?: string;
}) {
  try {
    const response = await fetch(
      "https://localhost:7082/api/biblioApp/Books/RegisteredBooks"
    );

    if (!response.ok) throw new Error("No se encontró ningún libro.");

    const { data } = await response.json();

    return data;
  } catch (error) {
    return {
      success: false,
      message: "No se pudo obtener los libros disponibles. Intente más tarde.",
    };
  }
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

type UpdatedBookOmitData =
  | "id"
  | "formattedAuthor"
  | "formattedGenre"
  | "created_at"
  | "image";

export async function updateBook(
  bookId: string,
  updatedData: Omit<Book, UpdatedBookOmitData>
) {
  try {
    const docRef = doc(firestore, "books", bookId);

    const newData = {
      ...updatedData,
      formattedGenre: formatCharacteristic(updatedData.nameGenre),
      formattedAuthor: formatCharacteristic(updatedData.author),
    };

    console.log(newData);

    await updateDoc(docRef, newData);
  } catch (error) {
    console.log("Error al actualizar el libro");
  }
}

export async function createBook(
  book: Omit<Book, "id" | "created_at" | "formattedAuthor" | "formattedGenre">
) {
  try {
    const response = await fetch(
      "https://localhost:7082/api/biblioApp/Books/RegisterBook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      }
    );

    console.log(response);

    if (!response.ok)
      throw new Error(`Error al crear el libro: ${response.statusText}`);

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: "No se pudo crear el libro. Intente más tarde.",
    };
  }
}
