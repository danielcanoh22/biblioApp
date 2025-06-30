export type Genre = {
  id: number;
  name: string;
};

export interface GenresAPIResponse {
  data: Genre[];
  succeeded: true;
  message?: null;
}
