import { getLoans, getLoansWithBookDetails } from "~/services/apiLoans";
import { DotSpinner } from "~/ui/dot-spinner";
import type { Route } from "./+types/loans";

export async function clientLoader() {
  const loans = await getLoansWithBookDetails();
  return { loans };
}

export default function Loans({ loaderData }: Route.ComponentProps) {
  const { loans } = loaderData;
  console.log(loans);

  return (
    <div>
      <DotSpinner />
    </div>
  );
}
