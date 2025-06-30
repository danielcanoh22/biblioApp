export type Author = {
  id: number;
  name: string;
};

export interface AuthorsAPIResponse {
  data: Author[];
  succeeded: true;
  message?: null;
}
