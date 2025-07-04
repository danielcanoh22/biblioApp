import type { UpdateUsersApiPayload } from "~/schemas/user";
import type { APIError, GeneralApiResponse } from "~/types/globals";
import type { UserAPIResponse, UsersAPIResponse } from "~/types/users";
import { apiClient } from "./apiClient";

const BASE_URL = "/api/users";

type UserFilters = {
  page?: number;
  limit?: number;
  name?: string;
  email?: string;
};

export async function getUsers(
  filters: UserFilters = {}
): Promise<UsersAPIResponse | APIError> {
  const params = new URLSearchParams();

  if (filters.page) params.append("page", String(filters.page));
  if (filters.limit) params.append("limit", String(filters.limit));
  if (filters.name) params.append("name", filters.name);
  if (filters.email) params.append("email", filters.email);

  const endpoint = `${BASE_URL}?${params.toString()}`;

  return await apiClient(endpoint);
}

export async function getUserById(
  id: string | number
): Promise<UserAPIResponse | APIError> {
  return await apiClient(`${BASE_URL}/${id}`);
}

export async function updateUser(
  id: string | number,
  newData: UpdateUsersApiPayload
): Promise<GeneralApiResponse | APIError> {
  return await apiClient(`${BASE_URL}/${id}`, {
    method: "PATCH",
    body: newData,
  });
}

export async function deleteUser(
  id: string | number
): Promise<GeneralApiResponse | APIError> {
  return await apiClient(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}
