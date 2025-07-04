import toast from "react-hot-toast";
import {
  redirect,
  useNavigate,
  type ClientLoaderFunctionArgs,
} from "react-router";
import type { Route } from "./+types/user-edit";
import { Container } from "~/ui/container";
import { PrimaryTitle } from "~/ui/titles";
import { Message } from "~/ui/message";
import { ButtonBack } from "~/ui/button-back";
import { UserForm } from "~/features/users/user-form";
import { getUserById, updateUser } from "~/services/apiUsers";
import { updateUserSchema } from "~/schemas/user";

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const result = await getUserById(args.params?.userId || "");
  console.log("Usuario pa editar: ", result);

  return result;
}

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const { userId } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const validationResult = updateUserSchema.safeParse(data);

  if (!validationResult.success) {
    toast.error("Por favor, corrige los errores en el formulario.");
    return { errors: validationResult.error.flatten().fieldErrors };
  }

  const result = await updateUser(userId, validationResult.data);

  if (!result?.succeeded) {
    toast.error(result.message);
    return null;
  }
  toast.success("Usuario actualizado correctamente 😄");

  return redirect("/admin/usuarios");
}

export default function UserEdit({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const result = loaderData;

  console.log("Editar: ", result);

  if (!result.succeeded)
    return (
      <div className="flex flex-col gap-4">
        <ButtonBack />

        <Message variant="warning" text={`ERROR: ${result.message}`} />
      </div>
    );

  const user = result.data;

  const handleCancelEdit = () => {
    navigate(-1);
  };

  console.log(user);

  return (
    <Container>
      <PrimaryTitle text="Editar usuario" />

      <Message
        variant="info"
        text="Si no quieres actualizar la contraseña, deja el campo vacío"
      />

      <UserForm
        user={user}
        action={`/admin/usuarios/${user?.id}/editar`}
        onCancel={handleCancelEdit}
      />
    </Container>
  );
}
