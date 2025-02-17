import type { User } from "~/types/types";
import { useState } from "react";

import { Button } from "~/ui/button";
import { Modal } from "~/ui/modal";
import { Table } from "~/ui/table";
import { TableActionButton } from "~/ui/table-action-button";
import { PrimaryTitle } from "~/ui/titles";
import { UserForm } from "~/features/users/user-form";

const users = [
  {
    id: "1234abc",
    name: "Daniel",
    email: "daniel@test.com",
    rol: "admin",
  },
  {
    id: "5678abc",
    name: "Test",
    email: "test@test.com",
    rol: "usuario",
  },
];

const columns = [
  { key: "name", label: "Nombre" },
  { key: "email", label: "Email" },
  { key: "rol", label: "Rol" },
];

export default function Users() {
  const [showAddUser, setShowAddUser] = useState(false);

  return (
    <>
      <PrimaryTitle text="Gestionar Usuarios" />

      <div className="w-max mb-4">
        <Button onClick={() => setShowAddUser(true)}>+ Agregar usuario</Button>
      </div>

      <Modal isOpen={showAddUser} onClose={() => setShowAddUser(false)}>
        <h3 className="font-semibold text-center text-lg">Agregar Usuario</h3>
        <UserForm onClose={() => setShowAddUser(false)} />
      </Modal>

      <Table
        columns={columns}
        data={users}
        actions={(book: User) => (
          <>
            <TableActionButton url={book.id}>Editar</TableActionButton>
            <TableActionButton>Eliminar</TableActionButton>
          </>
        )}
      />
    </>
  );
}
