import type { Route } from "./+types/loans";
import { getLoans } from "~/services/apiLoans";
import { DotSpinner } from "~/ui/dot-spinner";

export async function clientLoader() {}

export default function Loans({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <DotSpinner />
    </div>
  );
}
