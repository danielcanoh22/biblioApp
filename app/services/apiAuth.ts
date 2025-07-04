import type {
  GetProfileAPIResponse,
  LoginAPIResponse,
  LoginData,
  LogoutAPIResponse,
  RegisterAPIResponse,
  RegisterData,
} from "~/types/auth";
import type { APIError } from "~/types/globals";

const BASE_URL = "http://localhost:3000/auth";
// const API_PREFIX = "/api";

export async function registerUser(
  data: RegisterData
): Promise<RegisterAPIResponse | APIError> {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok)
      throw new Error(`Error al registrar el usuario: ${response.statusText}`);

    const result: RegisterAPIResponse = await response.json();

    return result;
  } catch (error) {
    return {
      succeeded: false,
      message:
        "No se pudo crear el usuario en este momento. Intente más tarde.",
    };
  }
}

export async function loginUser(
  data: LoginData
): Promise<LoginAPIResponse | APIError> {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok)
      throw new Error(`Error al iniciar sesión: ${response.statusText}`);

    const result: LoginAPIResponse = await response.json();

    return result;
  } catch (error) {
    return {
      succeeded: false,
      message: "No se pudo iniciar sesión en este momento. Intente más tarde.",
    };
  }
}

export async function logoutUser(): Promise<LogoutAPIResponse | APIError> {
  try {
    const response = await fetch(`${BASE_URL}/logout`, { method: "POST" });

    if (!response.ok) {
      throw new Error("Error al cerrar la sesión");
    }

    const result: LogoutAPIResponse = await response.json();

    return result;
  } catch (error) {
    return {
      succeeded: false,
      message:
        "No se pudo cerrar la sesión en este momento. Intente más tarde.",
    };
  }
}

export async function getProfile(): Promise<GetProfileAPIResponse | APIError> {
  try {
    const response = await fetch(`${BASE_URL}/me`, {
      credentials: "include",
    });

    if (!response.ok) throw new Error("No hay sesión activa");

    const result: GetProfileAPIResponse = await response.json();

    return result;
  } catch (error) {
    return {
      succeeded: false,
      message:
        "No se pudo obtener el perfil del usuario actual. Intente más tarde.",
    };
  }
}
