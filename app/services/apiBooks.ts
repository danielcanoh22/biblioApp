import type {
  BookAPIResponse,
  BooksAPIError,
  BooksAPIResponse,
  TempBook,
} from "~/types/types";

export async function getBooks({
  author,
  genre,
}: {
  author?: string;
  genre?: string;
}): Promise<BooksAPIResponse | BooksAPIError> {
  try {
    const ENDPOINT = new URL(
      "https://localhost:7082/api/biblioApp/Books/RegisteredBooks"
    );

    if (author) ENDPOINT.searchParams.append("formattedAuthor", author);
    if (genre) ENDPOINT.searchParams.append("formattedGenre", genre);

    const response = await fetch(ENDPOINT);

    if (!response.ok) throw new Error("No se encontró ningún libro.");

    const data: BooksAPIResponse = await response.json();

    return data;
  } catch (error) {
    return {
      succeeded: false,
      message: "No se pudo obtener los libros disponibles. Intente más tarde.",
    };
  }
}

export async function getBookById(
  id: string
): Promise<BookAPIResponse | BooksAPIError> {
  try {
    const response = await fetch(
      `https://localhost:7082/api/biblioApp/Books/GetBookById?id=${id}`
    );

    if (!response.ok) throw new Error("No se encontró ningún libro.");

    const data: BookAPIResponse = await response.json();

    return data;
  } catch (error) {
    return {
      succeeded: false,
      message:
        "No se pudo obtener los datos del libro seleccionado. Intente más tarde.",
    };
  }
}

export async function createBook(book: TempBook) {
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

    if (!response.ok)
      throw new Error(`Error al crear el libro: ${response.statusText}`);

    return await response.json();
  } catch (error) {
    return {
      succeeded: false,
      message: "No se pudo crear el libro. Intente más tarde.",
    };
  }
}
