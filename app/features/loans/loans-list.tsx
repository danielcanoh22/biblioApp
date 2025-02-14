import type { Loan } from "~/types/types";
import { LoanItem } from "./loan-item";

type LoansListProps = {
  loans: Loan[];
  onCancel: (loan: Loan) => void;
};

export const LoansList = ({ loans, onCancel }: LoansListProps) => {
  return (
    <ul className="flex flex-col gap-4">
      {loans.map((loan) => (
        <LoanItem
          key={loan.bookId}
          loan={loan}
          onCancel={() => onCancel(loan)}
        />
      ))}
    </ul>
  );
};
