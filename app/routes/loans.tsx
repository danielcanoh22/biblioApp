import { useState } from "react";
import type { Loan } from "~/types/types";
import { LoanList } from "~/features/loans/loan-list";
import { ConfirmActions } from "~/ui/confirm-actions";
import { Modal } from "~/ui/modal";
import { PrimaryTitle } from "~/ui/titles";
import { Container } from "~/ui/container";

const loansData = [
  {
    id: "abcXzFG123",
    bookTitle: "Harry Potter",
    userName: "Daniel",
    userEmail: "daniel@test.com",
    status: "pendiente",
    loanDate: new Date().toISOString(),
  },
  {
    id: "abcXzFG456",
    bookTitle: "Escrito en el Agua",
    userName: "Daniel",
    userEmail: "daniel@test.com",
    status: "activo",
    loanDate: new Date().toISOString(),
  },
  {
    id: "abcXzFG789",
    bookTitle: "El Principito",
    userName: "Daniel",
    userEmail: "daniel@test.com",
    status: "devuelto",
    loanDate: new Date().toISOString(),
  },
];

export default function Loans() {
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

  return (
    <Container>
      <PrimaryTitle text="Préstamos" />
      <LoanList loans={loansData} onCancel={openModal} />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <p className="mb-4 text-center">
          ¿Deseas cancelar el préstamo del libro{" "}
          <span className="font-semibold italic">
            {selectedLoan?.bookTitle}
          </span>
          ?
        </p>

        <ConfirmActions
          cancelText="Cerrar"
          onCancel={closeModal}
          onConfirm={() => {}}
        />
      </Modal>
    </Container>
  );
}
