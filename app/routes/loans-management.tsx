import { useState } from "react";
import type { Loan } from "~/types/types";
import { ConfirmActions } from "~/ui/confirm-actions";
import { Container } from "~/ui/container";
import { Modal } from "~/ui/modal";
import { Table } from "~/ui/table";
import { TableActionButton } from "~/ui/table-action-button";
import { PrimaryTitle } from "~/ui/titles";

const loans = [
  {
    id: "loan123",
    bookId: "book123",
    bookTitle: "Harry Potter y el Prisionero de Azkaban",
    userId: "user123",
    userName: "Daniel",
    userEmail: "daniel@test.com",
    status: "activo",
    loanDate: new Date().toLocaleDateString(),
  },
  {
    id: "loan456",
    bookId: "book456",
    bookTitle: "Escrito en el Agua",
    userId: "user456",
    userName: "Lucas",
    userEmail: "lucas@test.com",
    status: "activo",
    loanDate: new Date().toLocaleDateString(),
  },
];

const columns = [
  { key: "loanDate", label: "Fecha" },
  { key: "userName", label: "Usuario" },
  { key: "userEmail", label: "Correo Electrónico" },
  { key: "bookTitle", label: "Título del Libro" },
  { key: "status", label: "Estado" },
];

export default function LoansManagement() {
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

  return (
    <Container>
      <PrimaryTitle text="Gestionar Préstamos" />

      <Modal isOpen={showCheckinBook} onClose={handleCloseCheckinBook}>
        <p className="mb-6 text-center">
          ¿Deseas registrar la devolución del libro{" "}
          <span className="font-semibold italic">
            {selectedLoan?.bookTitle}
          </span>
          ?
        </p>

        <ConfirmActions
          onCancel={handleCloseCheckinBook}
          onConfirm={() => {}}
        />
      </Modal>

      <Table
        columns={columns}
        data={loans}
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
  );
}
