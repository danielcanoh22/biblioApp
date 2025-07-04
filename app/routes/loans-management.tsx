import toast from "react-hot-toast";
import { useNavigate, type ClientLoaderFunctionArgs } from "react-router";
import { useState } from "react";
import { getLoans, updateLoanStatus } from "~/services/apiLoans";
import type { Route } from "./+types/loans-management";
import type { Loan } from "~/types/loans";
import { LOAN_STATUS } from "~/types/loans";
import { DEFAULT_PAGINATION } from "~/utils/constants/constants";
import { getLoansQuerySchema } from "~/schemas/loan";
import { ConfirmActions } from "~/ui/confirm-actions";
import { Container } from "~/ui/container";
import { Modal } from "~/ui/modal";
import { Table } from "~/ui/table";
import { TableActionButton } from "~/ui/table-action-button";
import { PrimaryTitle } from "~/ui/titles";
import { Message } from "~/ui/message";
import { FiltersToolbar } from "~/ui/filters-toolbar";

const columns = [
  { key: "loan_date", label: "Fecha" },
  { key: "user_name", label: "Usuario" },
  { key: "user_email", label: "Correo Electrónico" },
  { key: "book_title", label: "Título del Libro" },
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
  validatedParams.status = LOAN_STATUS.APPROVED;

  const data = await getLoans(validatedParams);

  return data;
}

export default function LoansManagement({ loaderData }: Route.ComponentProps) {
  const loans = loaderData;

  if (loans && !loans.succeeded)
    return (
      <Message
        variant="warning"
        text="Ha ocurrido un error al obtener la información de los préstamos activos"
      />
    );

  const navigate = useNavigate();
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [showCheckinBook, setShowCheckinBook] = useState(false);

  const handleOpenCheckinBook = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowCheckinBook(true);
  };

  const handleCloseCheckinBook = () => {
    setSelectedLoan(null);
    setShowCheckinBook(false);
  };

  const handleReturnBook = async (id: string | number) => {
    try {
      const result = await updateLoanStatus(id, {
        status: LOAN_STATUS.RETURNED,
      });

      if (!result.succeeded) {
        toast.error(result.message);
        return;
      }

      toast.success(`${result.message} 😄`);
      navigate("/admin/prestamos");
    } catch (error) {
      toast.error("Ocurrió un error inesperado 🤔");
    }
  };

  const loansData = loans?.data.loans || [];
  const pagination = loans?.data.pagination || DEFAULT_PAGINATION;

  return (
    <Container>
      <PrimaryTitle text="Gestionar Préstamos" />
      <FiltersToolbar
        fieldName="user_email"
        placeholder="Correo electrónico del usuario..."
        pagination={pagination}
      />

      {loansData.length < 1 ? (
        <Message variant="info" text="No hay ningún préstamo activo" />
      ) : (
        <>
          <Container>
            <Modal isOpen={showCheckinBook} onClose={handleCloseCheckinBook}>
              <p className="mb-6 text-center">
                ¿Deseas registrar la devolución del libro{" "}
                <span className="font-semibold italic">
                  {selectedLoan?.book_title}
                </span>
                ?
              </p>

              <ConfirmActions
                onCancel={handleCloseCheckinBook}
                onConfirm={() => {
                  if (!selectedLoan) return;

                  handleReturnBook(selectedLoan?.id);
                  handleCloseCheckinBook();
                }}
              />
            </Modal>

            <Table
              columns={columns}
              data={loansData}
              actions={(loan: Loan) => (
                <TableActionButton>
                  <span
                    className="text-indigo-400 hover:text-indigo-500"
                    onClick={() => handleOpenCheckinBook(loan)}
                  >
                    Registrar devolución
                  </span>
                </TableActionButton>
              )}
            />
          </Container>
        </>
      )}
    </Container>
  );
}
