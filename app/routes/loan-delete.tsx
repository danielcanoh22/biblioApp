import toast from "react-hot-toast";
import { redirect } from "react-router";
import { deleteLoan } from "~/services/apiLoans";
import type { Route } from "./+types/loan-delete";

export async function clientAction({ params }: Route.ClientActionArgs) {
  const result = await deleteLoan(params.loanId);

  if (!result?.succeeded) {
    toast.error(result.message);
    return null;
  }

  toast.success("Solicitud de préstamo eliminada correctamente 😄");

  return redirect("/prestamos");
}

export default function LoanDelete() {
  return null;
}
