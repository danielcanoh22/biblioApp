import type { CreateLoanApiDTO, UpdateLoanStatusApiDTO } from "~/schemas/loan";
import type {
  CreateLoanApiResponse,
  LOAN_STATUS,
  LoanAPIResponse,
  LoansAPIResponse,
} from "~/types/loans";
import { apiClient } from "./apiClient";
import type { APIError, GeneralApiResponse } from "~/types/globals";

const BASE_URL = "/api/loans";

interface LoansFilters {
  page?: number;
  limit?: number;
  user_email?: string;
  status?: LOAN_STATUS;
}

export async function createLoan(
  data: CreateLoanApiDTO
): Promise<CreateLoanApiResponse | APIError> {
  return await apiClient(BASE_URL, {
    method: "POST",
    body: data,
  });
}

export async function getLoans(
  filters: LoansFilters = {}
): Promise<LoansAPIResponse | APIError> {
  const params = new URLSearchParams();

  if (filters.page) params.append("page", String(filters.page));
  if (filters.limit) params.append("limit", String(filters.limit));
  if (filters.user_email) params.append("user_email", filters.user_email);
  if (filters.status) params.append("status", filters.status);

  const endpoint = `${BASE_URL}?${params.toString()}`;

  return await apiClient(endpoint);
}

export async function getLoanById(
  id: string | number
): Promise<LoanAPIResponse | APIError> {
  return await apiClient(`${BASE_URL}/${id}`);
}

export async function updateLoanStatus(
  id: string | number,
  data: UpdateLoanStatusApiDTO
): Promise<GeneralApiResponse | APIError> {
  return await apiClient(`${BASE_URL}/${id}`, {
    method: "PATCH",
    body: data,
  });
}

export async function deleteLoan(
  id: string | number
): Promise<GeneralApiResponse | APIError> {
  return await apiClient(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}
