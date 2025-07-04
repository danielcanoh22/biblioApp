import { apiClient } from "./apiClient";
import type {
  CreateBookApiPayload,
  UpdateBookApiPayload,
} from "~/schemas/book";
import type {
  BookAPIResponse,
  BooksAPIResponse,
  CreateBookApiResponse,
} from "~/types/books";
import type { APIError, GeneralApiResponse } from "~/types/globals";

const BASE_URL = "/api/books";

type BookFilters = {
  page?: number;
  limit?: number;
  author_id?: string;
  genre_id?: string;
  title?: string;
};

export async function getBooks(
  filters: BookFilters = {}
): Promise<BooksAPIResponse | APIError> {
  const params = new URLSearchParams();

  if (filters.page) params.append("page", String(filters.page));
  if (filters.limit) params.append("limit", String(filters.limit));
  if (filters.author_id) params.append("author", filters.author_id);
  if (filters.genre_id) params.append("genre", filters.genre_id);
  if (filters.title) params.append("title", filters.title);

  const endpoint = `${BASE_URL}?${params.toString()}`;

  return await apiClient(endpoint);
}

export async function getBookById(
  id: string | number
): Promise<BookAPIResponse | APIError> {
  return await apiClient(`${BASE_URL}/${id}`);
}

export async function createBook(
  data: CreateBookApiPayload
): Promise<CreateBookApiResponse | APIError> {
  return await apiClient(BASE_URL, {
    method: "POST",
    body: data,
  });
}

export async function updateBook(
  id: string | number,
  newData: UpdateBookApiPayload
): Promise<GeneralApiResponse | APIError> {
  return await apiClient(`${BASE_URL}/${id}`, {
    method: "PATCH",
    body: newData,
  });
}

export async function deleteBook(
  id: string | number
): Promise<GeneralApiResponse | APIError> {
  return await apiClient(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}
