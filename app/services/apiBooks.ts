import type {
  CreateBookApiPayload,
  UpdateBookApiPayload,
} from "~/schemas/book";
import type {
  Book,
  BookAPIResponse,
  APIError,
  BooksAPIResponse,
} from "~/types/types";

const BASE_URL = "http://localhost:3000/books";

export async function getBooks({
  page,
  limit = 8,
  author,
  genre,
}: {
  page?: string;
  limit?: string | number;
  author?: string;
  genre?: string;
}): Promise<BooksAPIResponse | APIError> {
  try {
    const ENDPOINT = new URL(`${BASE_URL}?limit=${limit}`);

    if (page) ENDPOINT.searchParams.append("page", String(page));
    if (author) ENDPOINT.searchParams.append("author", author);
    if (genre) ENDPOINT.searchParams.append("genre", genre);

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
): Promise<BookAPIResponse | APIError> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);

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

export async function createBook(data: CreateBookApiPayload) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok)
      throw new Error(`Error al crear el libro: ${response.statusText}`);

    return response.json();
  } catch (error) {
    return {
      succeeded: false,
      message: "No se pudo crear el libro. Intente más tarde.",
    };
  }
}

export async function updateBook(id: string, newData: UpdateBookApiPayload) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok)
      throw new Error(`Error al actualizar el libro: ${response.statusText}`);

    return await response.json();
  } catch (error) {
    return {
      succeeded: false,
      message: "No se pudo actualizar el libro. Intente más tarde.",
    };
  }
}

export async function deleteBook(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok)
      throw new Error(`Error al eliminar el libro: ${response.statusText}`);

    return await response.json();
  } catch (error) {
    return {
      succeeded: false,
      message: "No se pudo eliminar el libro. Intente más tarde.",
    };
  }
}
