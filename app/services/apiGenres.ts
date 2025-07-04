import type { GenresAPIResponse } from "~/types/genres";
import type { APIError } from "~/types/globals";

const BASE_URL = "http://localhost:3000/api/genres";

export async function getGenres(): Promise<GenresAPIResponse | APIError> {
  try {
    const response = await fetch(BASE_URL, { credentials: "include" });

    if (!response.ok) throw new Error("No se encontró ningún autor.");

    const data: GenresAPIResponse = await response.json();

    return data;
  } catch (error) {
    return {
      succeeded: false,
      message: "No se pudo obtener los géneros disponibles. Intente más tarde.",
    };
  }
}
