import type { Pagination } from "./globals";

export enum LOAN_STATUS {
  RETURNED = "devuelto",
  PENDING = "pendiente",
  REFUSED = "rechazado",
  APPROVED = "activo",
}

export type Loan = {
  id: number;
  loan_date: string;
  due_date: string;
  status: LOAN_STATUS;
  user_id?: number;
  user_name: string;
  user_email: string;
  book_id?: number;
  book_title: string;
};

export interface LoansAPIResponse {
  data: {
    loans: Loan[];
    pagination: Pagination;
  };
  succeeded: boolean;
  errors?: null;
  message?: null;
}

export interface LoanAPIResponse {
  data: Loan;
  succeeded: boolean;
  errors?: null;
  message?: null;
}

export interface CreateLoanApiResponse {
  data: Loan;
  succeeded: true;
}

export type LoanFormValues = {
  user_name: string;
  user_email: string;
  book_id: string | number;
  book_title: string;
};
