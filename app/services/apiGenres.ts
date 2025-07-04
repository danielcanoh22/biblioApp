import type { GenresAPIResponse } from "~/types/genres";
import type { APIError } from "~/types/globals";
import { apiClient } from "./apiClient";

const BASE_URL = "/api/genres";

export async function getGenres(): Promise<GenresAPIResponse | APIError> {
  return await apiClient(BASE_URL);
}
