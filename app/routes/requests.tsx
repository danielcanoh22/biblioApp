import { LucideEye } from "lucide-react";
import type { Request } from "~/types/types";
import { Container } from "~/ui/container";
import { Table } from "~/ui/table";
import { TableActionButton } from "~/ui/table-action-button";
import { PrimaryTitle } from "~/ui/titles";

const columns = [
  { key: "requestDate", label: "Fecha" },
  { key: "userName", label: "Usuario" },
  { key: "userEmail", label: "Correo electrónico" },
  { key: "bookTitle", label: "Libro" },
  { key: "status", label: "Estado" },
];

const requests = [
  {
    id: "req123",
    userName: "Daniel",
    userEmail: "daniel@test.com",
    bookTitle: "Harry Potter",
    status: "pendiente",
    requestDate: new Date().toLocaleDateString(),
  },
  {
    id: "req456",
    userName: "Test",
    userEmail: "test@test.com",
    bookTitle: "Escrito en el Agua",
    status: "aprobado",
    requestDate: new Date().toLocaleDateString(),
  },
];

export default function Requests() {
  return (
    <Container>
      <PrimaryTitle text="Gestionar Solicitudes" />

      <Table
        columns={columns}
        data={requests}
        actions={(request: Request) =>
          request.status === "pendiente" ? (
            <TableActionButton url={request.id}>
              <LucideEye />
              <span className="ml-2">Ver detalles</span>
            </TableActionButton>
          ) : (
            <span className="bg-indigo-200 text-indigo-800 px-2 rounded-full font-medium">
              Registrado
            </span>
          )
        }
      />
    </Container>
  );
}
