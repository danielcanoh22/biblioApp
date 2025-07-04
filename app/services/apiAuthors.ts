import type { AuthorsAPIResponse } from "~/types/authors";
import type { APIError } from "~/types/types";

const BASE_URL = "http://localhost:3000/api/authors";

export async function getAuthors(): Promise<AuthorsAPIResponse | APIError> {
  try {
    const response = await fetch(BASE_URL, { credentials: "include" });

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
