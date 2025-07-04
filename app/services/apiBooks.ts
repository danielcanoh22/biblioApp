import type {
  CreateBookApiPayload,
  UpdateBookApiPayload,
} from "~/schemas/book";
import type { BookAPIResponse, BooksAPIResponse } from "~/types/books";
import type { APIError } from "~/types/globals";

const BASE_URL = "http://localhost:3000/api/books";

export async function getBooks({
  page,
  limit = 8,
  author_id,
  genre_id,
  title,
}: {
  page?: number;
  limit?: number;
  author_id?: string;
  genre_id?: string;
  title?: string;
}): Promise<BooksAPIResponse | APIError> {
  try {
    const ENDPOINT = new URL(`${BASE_URL}?limit=${limit}`);

    if (page) ENDPOINT.searchParams.append("page", String(page));
    if (author_id) ENDPOINT.searchParams.append("author", author_id);
    if (genre_id) ENDPOINT.searchParams.append("genre", genre_id);
    if (title) ENDPOINT.searchParams.append("title", title);

    const response = await fetch(ENDPOINT, {
      credentials: "include",
    });

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
    const response = await fetch(`${BASE_URL}/${id}`, {
      credentials: "include",
    });

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
      credentials: "include",
    });

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

export async function updateBook(id: string, newData: UpdateBookApiPayload) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
      credentials: "include",
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
      credentials: "include",
    });

    console.log("REsponse: ", response);

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
