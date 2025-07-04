import type {
  GetProfileAPIResponse,
  LoginAPIResponse,
  LoginData,
  RegisterAPIResponse,
  RegisterData,
} from "~/types/auth";
import type { APIError, GeneralApiResponse } from "~/types/globals";
import { apiClient } from "./apiClient";

const BASE_URL = "/auth";

export async function registerUser(
  data: RegisterData
): Promise<RegisterAPIResponse | APIError> {
  return await apiClient(`${BASE_URL}/register`, {
    method: "POST",
    body: data,
  });
}

export async function loginUser(
  data: LoginData
): Promise<LoginAPIResponse | APIError> {
  return await apiClient(`${BASE_URL}/login`, {
    method: "POST",
    body: data,
  });
}

export async function logoutUser(): Promise<GeneralApiResponse | APIError> {
  return await apiClient(`${BASE_URL}/logout`, {
    method: "POST",
  });
}

export async function getProfile(): Promise<GetProfileAPIResponse | APIError> {
  return await apiClient(`${BASE_URL}/me`);
}
