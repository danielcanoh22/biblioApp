import type { UpdateUsersApiPayload } from "~/schemas/user";
import type { APIError } from "~/types/types";
import type { UserAPIResponse, UsersAPIResponse } from "~/types/users";

const BASE_URL = "http://localhost:3000/api/users";

export async function getUsers({
  page = 1,
  limit = 10,
  name,
  email,
}: {
  page?: string | number;
  limit?: number;
  name?: string;
  email?: string;
}): Promise<UsersAPIResponse | APIError> {
  try {
    const ENDPOINT = new URL(`${BASE_URL}?limit=${limit}`);

    if (page) ENDPOINT.searchParams.append("page", String(page));
    if (email) ENDPOINT.searchParams.append("email", email);
    if (name) ENDPOINT.searchParams.append("name", name);

    const response = await fetch(ENDPOINT, { credentials: "include" });

    if (!response.ok) throw new Error("No se encontró ningún usuario");

    const data: UsersAPIResponse = await response.json();

    return data;
  } catch (error) {
    return {
      succeeded: false,
      message:
        "No se pudo obtener los usuarios registrados. Intente más tarde.",
    };
  }
}

export async function getUserById(
  id: string
): Promise<UserAPIResponse | APIError> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      credentials: "include",
    });

    if (!response.ok) throw new Error("No se encontró ningún usuario");

    const data: UserAPIResponse = await response.json();

    return data;
  } catch (error) {
    return {
      succeeded: false,
      message:
        "No se pudo obtener los datos del usuario seleccionado. Intente más tarde.",
    };
  }
}

export async function updateUser(id: string, newData: UpdateUsersApiPayload) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
      credentials: "include",
    });

    console.log("La response ", response);
    console.log("La newData ", newData);

    if (!response.ok)
      throw new Error(`Error al actualizar el usuario: ${response.statusText}`);

    return await response.json();
  } catch (error) {
    return {
      succeeded: false,
      message: "No se pudo actualizar el usuario. Intente más tarde.",
    };
  }
}

export async function deleteUser(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok)
      throw new Error(`Error al eliminar el usuario: ${response.statusText}`);

    return await response.json();
  } catch (error) {
    return {
      succeeded: false,
      message: "No se pudo eliminar el usuario. Intente más tarde.",
    };
  }
}
