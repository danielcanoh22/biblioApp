import { LucideEye } from "lucide-react";
import { type ClientLoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/requests";
import type { Loan } from "~/types/loans";
import { getLoansQuerySchema } from "~/schemas/loan";
import { getLoans } from "~/services/apiLoans";
import { Container } from "~/ui/container";
import { Table } from "~/ui/table";
import { TableActionButton } from "~/ui/table-action-button";
import { PrimaryTitle } from "~/ui/titles";
import { Message } from "~/ui/message";
import { SearchBar } from "~/ui/search-bar";
import { PaginationControls } from "~/ui/pagination-controls";

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

  const validatedParams = getLoansQuerySchema.parse(queryParams);

  const data = await getLoans(validatedParams);

  return data;
}

export default function Requests({ loaderData }: Route.ComponentProps) {
  const loans = loaderData;

  if (!loans.succeeded)
    return (
      <Message
        variant="warning"
        text="Ha ocurrido un error al cargar las solicitudes de préstamo"
      />
    );

  const dataForTable = loans.data.loans;
  const pagination = loans.data.pagination;

  return (
    <Container>
      <PrimaryTitle text="Gestionar Solicitudes" />

      <div className="mb-6 flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-center">
        <SearchBar
          field="user_email"
          placeholder="Correo electrónico del usuario..."
        />
        <div className="lg:justify-self-end lg:w-max">
          <PaginationControls pagination={pagination} />
        </div>
      </div>
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
    </Container>
  );
}
