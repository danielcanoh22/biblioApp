import type { Loan } from "~/types/loans";
import { LoanItem } from "./loan-item";

type LoansListProps = {
  loans: Loan[];
  onCancel: (loan: Loan) => void;
};

export const LoanList = ({ loans, onCancel }: LoansListProps) => {
  return (
    <ul className="flex flex-col gap-4 flex-wrap md:flex-row">
      {loans.map((loan) => (
        <LoanItem key={loan.id} loan={loan} onCancel={() => onCancel(loan)} />
      ))}
    </ul>
  );
};
