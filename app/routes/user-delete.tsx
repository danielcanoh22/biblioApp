import toast from "react-hot-toast";
import { redirect } from "react-router";
import { deleteUser } from "~/services/apiUsers";
import type { Route } from "./+types/user-delete";

export async function clientAction({ params }: Route.ClientActionArgs) {
  const result = await deleteUser(params.userId);

  if (!result?.succeeded) {
    toast.error(result.message);
    return redirect("/admin/usuarios");
  }

  toast.success("Usuario eliminado correctamente 😄");

  return redirect("/admin/usuarios");
}

export default function UserDelete() {
  return null;
}
