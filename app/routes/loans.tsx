import { useState } from "react";
import { LoanList } from "~/features/loans/loan-list";
import { ConfirmActions } from "~/ui/confirm-actions";
import { Modal } from "~/ui/modal";
import { PrimaryTitle } from "~/ui/titles";
import { Container } from "~/ui/container";
import { useFetcher, type ClientLoaderFunctionArgs } from "react-router";
import { getLoans } from "~/services/apiLoans";
import type { Route } from "./+types/loans";
import { Message } from "~/ui/message";
import { LOAN_STATUS, type Loan } from "~/types/loans";

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  // Obtener información del usuario
  const data = await getLoans({ user_email: "daniel.canoh22@gmail.com" });

  return data;
}

export default function Loans({ loaderData }: Route.ComponentProps) {
  const loans = loaderData;

  if (!loans.succeeded)
    return (
      <Message
        variant="warning"
        text="Ha ocurrido un error al obtener la información de los préstamos"
      />
    );

  const fetcher = useFetcher();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const openModal = (loan: Loan) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLoan(null);
  };

  const loansData = loans.data.loans.filter(
    (loan) => loan.status !== LOAN_STATUS.RETURNED
  );

  return (
    <Container>
      <PrimaryTitle text="Préstamos" />

      {loansData.length < 1 ? (
        <Message variant="info" text="Aún no haz realizado ningún préstamo" />
      ) : (
        <>
          <LoanList loans={loansData} onCancel={openModal} />

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <p className="mb-4 text-center">
              ¿Deseas cancelar el préstamo del libro{" "}
              <span className="font-semibold italic">
                {selectedLoan?.book_title}
              </span>
              ?
            </p>

            <ConfirmActions
              cancelText="Cerrar"
              onCancel={closeModal}
              onConfirm={() => {
                if (!selectedLoan) return;

                fetcher.submit(null, {
                  method: "DELETE",
                  action: `/prestamos/${selectedLoan.id}/eliminar`,
                });

                closeModal();
              }}
            />
          </Modal>
        </>
      )}
    </Container>
  );
}
