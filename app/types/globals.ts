export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
};

export type Column = {
  key: string;
  label: string;
};

export const enum THEMES {
  LIGHT = "light",
  DARK = "dark",
}

export interface APIError {
  succeeded: false;
  message: string;
}
