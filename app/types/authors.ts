export type Author = {
  id: number;
  name: string;
};

export interface AuthorsAPIError {
  succeeded: boolean;
  message: string;
}
export interface AuthorsAPIResponse {
  data: Author[];
  succeeded: boolean;
  errors?: null;
  message?: null;
}
