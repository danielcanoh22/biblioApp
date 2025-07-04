import type { Pagination } from "./globals";

export enum USER_ROLE {
  ADMIN = "admin",
  USER = "user",
}

export type User = {
  id: number;
  name: string;
  email: string;
  role: USER_ROLE;
  created_at?: string;
};

export interface UsersAPIResponse {
  data: {
    users: User[];
    pagination: Pagination;
  };
  succeeded: boolean;
  errors?: null;
  message?: null;
}

export interface UserAPIResponse {
  data: User;
  succeeded: boolean;
  errors?: null;
  message?: null;
}
