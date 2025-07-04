import toast from "react-hot-toast";
import { LucideEye } from "lucide-react";
import { type ClientLoaderFunctionArgs } from "react-router";
import { getLoans } from "~/services/apiLoans";
import type { Route } from "./+types/requests";
import type { Loan } from "~/types/loans";
import { getLoansQuerySchema } from "~/schemas/loan";
import { DEFAULT_PAGINATION } from "~/utils/constants/constants";
import { Container } from "~/ui/container";
import { Table } from "~/ui/table";
import { TableActionButton } from "~/ui/table-action-button";
import { PrimaryTitle } from "~/ui/titles";
import { Message } from "~/ui/message";
import { FiltersToolbar } from "~/ui/filters-toolbar";

const columns = [
  { key: "loan_date", label: "Fecha" },
  { key: "user_name", label: "Usuario" },
  { key: "user_email", label: "Correo electrónico" },
  { key: "book_title", label: "Libro" },
  { key: "status", label: "Estado" },
];

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const url = new URL(args.request.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());

  const validationResult = getLoansQuerySchema.safeParse(queryParams);

  if (!validationResult.success) {
    toast.error("El correo electrónico ingresado no es válido");
    return null;
  }

  const validatedParams = validationResult.data;

  const data = await getLoans(validatedParams);

  return data;
}

export default function Requests({ loaderData }: Route.ComponentProps) {
  const result = loaderData;

  if ((result && !result.succeeded) || !result)
    return (
      <Message
        variant="warning"
        text="Ha ocurrido un error al cargar las solicitudes de préstamo"
      />
    );

  const dataForTable = result.data.loans || [];
  const pagination = result.data.pagination || DEFAULT_PAGINATION;

  return (
    <Container>
      <PrimaryTitle text="Gestionar Solicitudes" />
      <FiltersToolbar
        fieldName="user_email"
        placeholder="Correo electrónico del usuario..."
        pagination={pagination}
      />

      {dataForTable.length < 1 ? (
        <Message variant="info" text="No hay ninguna solicitud de préstamo" />
      ) : (
        <Table
          columns={columns}
          data={dataForTable}
          actions={(request: Loan) =>
            request.status === "pendiente" ? (
              <TableActionButton url={String(request.id)}>
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
      )}
    </Container>
  );
}
