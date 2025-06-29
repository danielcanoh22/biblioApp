export type Genre = {
  id: number;
  name: string;
};

export interface GenresAPIResponse {
  data: Genre[];
  succeeded: boolean;
  errors?: null;
  message?: null;
}
