import { useState } from "react";
import { LoansList } from "~/features/loans/loans-list";
import type { Loan } from "~/types/types";
import { ConfirmActions } from "~/ui/confirm-actions";
import { Modal } from "~/ui/modal";
import { PrimaryTitle } from "~/ui/titles";

const loansData = [
  {
    loanId: "abcXzFG123",
    bookId: "loan123",
    bookTitle: "Harry Potter",
    userId: "user123",
    userName: "Daniel",
    userEmail: "daniel@test.com",
    status: "pendiente",
  },
  {
    loanId: "abcXzFG456",
    bookId: "loan345",
    bookTitle: "Escrito en el Agua",
    userId: "user345",
    userName: "Daniel",
    userEmail: "daniel@test.com",
    status: "activo",
  },
  {
    loanId: "abcXzFG789",
    bookId: "loan678",
    bookTitle: "El Principito",
    userId: "user678",
    userName: "Daniel",
    userEmail: "daniel@test.com",
    status: "devuelto",
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
    <>
      <PrimaryTitle text="Préstamos" />
      <LoansList loans={loansData} onCancel={openModal} />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <p className="mb-4">
          ¿Deseas cancelar el préstamo del libro {selectedLoan?.bookTitle}?
        </p>

        <ConfirmActions
          cancelText="Cerrar"
          onCancel={closeModal}
          onConfirm={() => {}}
        />
      </Modal>
    </>
  );
}
