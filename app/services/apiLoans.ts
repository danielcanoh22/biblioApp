import type { CreateLoanApiDTO, UpdateLoanStatusApiDTO } from "~/schemas/loan";
import type {
  LOAN_STATUS,
  LoanAPIResponse,
  LoansAPIResponse,
  UpdateLoanStatusAPIResponse,
} from "~/types/loans";
import type { APIError } from "~/types/types";

const BASE_URL = "http://localhost:3000/loans";

export async function createLoan(data: CreateLoanApiDTO) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok)
      throw new Error(
        `Error al crear la solicitud de préstamo: ${response.statusText}`
      );

    return response.json();
  } catch (error) {
    return {
      succeeded: false,
      message: "No se pudo crear la solicitud de préstamo. Intente más tarde.",
    };
  }
}

export async function getLoans({
  page = 1,
  limit = 10,
  user_email,
  status,
}: {
  page?: string | number;
  limit?: number;
  user_email?: string;
  status?: LOAN_STATUS;
}): Promise<LoansAPIResponse | APIError> {
  try {
    const ENDPOINT = new URL(`${BASE_URL}?limit=${limit}`);

    if (page) ENDPOINT.searchParams.append("page", String(page));
    if (user_email) ENDPOINT.searchParams.append("user_email", user_email);
    if (status) ENDPOINT.searchParams.append("status", status);

    const response = await fetch(ENDPOINT);

    if (!response.ok)
      throw new Error("No se encontró ninguna solicitud de préstamo");

    const data: LoansAPIResponse = await response.json();

    return data;
  } catch (error) {
    return {
      succeeded: false,
      message:
        "No se pudo obtener las solicitudes de préstamo. Intente más tarde.",
    };
  }
}

export async function getLoanById(
  id: string | number
): Promise<LoanAPIResponse | APIError> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok)
      throw new Error("No se encontró ninguna solicitud de préstamo");

    const data: LoanAPIResponse = await response.json();

    return data;
  } catch (error) {
    return {
      succeeded: false,
      message:
        "No se pudo obtener los datos de la solicitud seleccionada. Intente más tarde.",
    };
  }
}

export async function updateLoanStatus(
  id: string | number,
  data: UpdateLoanStatusApiDTO
): Promise<UpdateLoanStatusAPIResponse | APIError> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData: UpdateLoanStatusAPIResponse = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.message || `Error del servidor: ${response.statusText}`
      );
    }

    return responseData;
  } catch (error) {
    return {
      succeeded: false,
      message:
        error instanceof Error ? error.message : "Ocurrió un error inesperado",
    };
  }
}

export async function deleteLoan(id: string | number) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok)
      throw new Error(
        `Error al eliminar la solicitud de préstamo: ${response.statusText}`
      );

    return await response.json();
  } catch (error) {
    return {
      succeeded: false,
      message:
        "No se pudo eliminar la solicitud de préstamo. Intente más tarde.",
    };
  }
}
