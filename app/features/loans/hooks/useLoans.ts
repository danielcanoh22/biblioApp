import { useQuery } from "@tanstack/react-query";
import type { GetLoansApiDTO } from "~/schemas/loan";
import { getLoans } from "~/services/apiLoans";
import type { LoansAPIResponse } from "~/types/loans";

const loansQueryKey = "loans";

export const loansQuery = (params: GetLoansApiDTO) => ({
  queryKey: [loansQueryKey, params],
  queryFn: () => getLoans(params),
});

export const useLoans = (
  params: GetLoansApiDTO,
  initialData: LoansAPIResponse
) => {
  const { data, isPending, isError } = useQuery({
    ...loansQuery(params),
    initialData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return { loans: data, isPending, isError };
};
