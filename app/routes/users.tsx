import toast from "react-hot-toast";
import { Form, type ClientLoaderFunctionArgs } from "react-router";
import { useState } from "react";
import { registerUser } from "~/services/apiAuth";
import { getUsers } from "~/services/apiUsers";
import type { Route } from "./+types/users";
import type { User } from "~/types/users";
import { registerSchema } from "~/schemas/auth";
import { getUsersQuerySchema } from "~/schemas/user";
import { DEFAULT_PAGINATION } from "~/utils/constants/constants";
import { Button } from "~/ui/button";
import { Modal } from "~/ui/modal";
import { Table } from "~/ui/table";
import { TableActionButton } from "~/ui/table-action-button";
import { PrimaryTitle } from "~/ui/titles";
import { UserForm } from "~/features/users/user-form";
import { Container } from "~/ui/container";
import { Message } from "~/ui/message";
import { FiltersToolbar } from "~/ui/filters-toolbar";

const columns = [
  { key: "name", label: "Nombre" },
  { key: "email", label: "Email" },
  { key: "role", label: "Rol" },
];

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const submissionData = Object.fromEntries(formData.entries());

  const validationResult = registerSchema.safeParse(submissionData);

  if (!validationResult.success) {
    toast.error("Por favor, corrige los errores del formulario.");
    return { errors: validationResult.error.flatten().fieldErrors };
  }

  const result = await registerUser(validationResult.data);

  if (!result?.succeeded) {
    toast.error(result.message);
    return null;
  }

  toast.success("Usuario registrado correctamente 😄");

  return null;
}

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const url = new URL(args.request.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());

  const validationResult = getUsersQuerySchema.safeParse(queryParams);

  if (!validationResult.success) {
    toast.error("El correo electrónico ingresado no es válido");
    return null;
  }

  const validatedParams = validationResult.data;

  const data = await getUsers(validatedParams);

  return data;
}

export default function Users({ loaderData }: Route.ComponentProps) {
  const users = loaderData;

  if ((users && !users.succeeded) || !users)
    return (
      <Message
        variant="warning"
        text="Ha ocurrido un error al obtener los usuarios registrados"
      />
    );

  const [showAddUser, setShowAddUser] = useState(false);

  const usersData = users.data.users || [];
  const pagination = users.data.pagination || DEFAULT_PAGINATION;

  return (
    <Container>
      <PrimaryTitle text="Gestionar Usuarios" />
      <div className="w-max mb-4">
        <Button onClick={() => setShowAddUser(true)}>+ Agregar usuario</Button>
      </div>
      <FiltersToolbar
        fieldName="email"
        placeholder="Ingresa el correo electrónico de un usuario"
        pagination={pagination}
      />

      <Modal isOpen={showAddUser} onClose={() => setShowAddUser(false)}>
        <h3 className="font-semibold text-center text-lg">Agregar Usuario</h3>
        <UserForm onCancel={() => setShowAddUser(false)} />
      </Modal>

      {usersData.length < 1 ? (
        <Message variant="info" text="No hay ningún usuario registrado" />
      ) : (
        <Table
          columns={columns}
          data={usersData}
          actions={(user: User) => (
            <>
              <div>
                <TableActionButton url={`${String(user.id)}/editar`}>
                  Editar
                </TableActionButton>
              </div>
              <div>
                <Form
                  action={`${user.id}/eliminar`}
                  method="post"
                  onSubmit={(event) => {
                    const response = confirm(
                      `¿Seguro que deseas eliminar al usuario ${user.name}?`
                    );
                    if (!response) {
                      event.preventDefault();
                    }
                  }}
                >
                  <TableActionButton type="submit">Eliminar</TableActionButton>
                </Form>
              </div>
            </>
          )}
        />
      )}
    </Container>
  );
}
