import type { AuthorsAPIError, AuthorsAPIResponse } from "~/types/authors";

const BASE_URL = "http://localhost:3000/authors";

export async function getAuthors(): Promise<
  AuthorsAPIResponse | AuthorsAPIError
> {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) throw new Error("No se encontró ningún autor.");

    const data: AuthorsAPIResponse = await response.json();

    return data;
  } catch (error) {
    return {
      succeeded: false,
      message: "No se pudo obtener los autores disponibles. Intente más tarde.",
    };
  }
}
