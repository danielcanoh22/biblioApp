import type { AuthorsAPIResponse } from "~/types/authors";
import type { APIError } from "~/types/globals";
import { apiClient } from "./apiClient";

const BASE_URL = "/api/authors";

export async function getAuthors(): Promise<AuthorsAPIResponse | APIError> {
  return await apiClient(BASE_URL);
}
