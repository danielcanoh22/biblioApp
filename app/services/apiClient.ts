import type { APIError } from "~/types/globals";

const BASE_URL = "http://localhost:3000";

type ApiResponse<T> = { succeeded: true; data: T } | APIError;

type ApiClientOptions = Omit<RequestInit, "body"> & {
  body?: Record<string, any>;
};

export async function apiClient<TSuccessResponse>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<TSuccessResponse | APIError> {
  try {
    const config: RequestInit = {
      method: options.method || "GET",
      credentials: "include",
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Ocurrió un error en la respuesta del servidor"
      );
    }

    return data;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Error de conexión o respuesta no válida";

    return {
      succeeded: false,
      message,
    };
  }
}
