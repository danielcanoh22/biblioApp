import { LucideMail, LucideUser, LucideX } from "lucide-react";
import type { Loan } from "~/types/types";

type LoanItemProps = {
  loan: Loan;
  onCancel: () => void;
};

const statusClasses: Record<string, string> = {
  pendiente: "bg-orange-200 text-orange-900",
  activo: "bg-green-200 text-green-900",
  devuelto: "bg-indigo-200 text-indigo-900",
};

export const LoanItem = ({ loan, onCancel }: LoanItemProps) => {
  return (
    <li className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-none overflow-hidden max-w-96 sm:min-w-80">
      <div className="bg-indigo-600 dark:bg-indigo-500 p-3 flex items-center justify-between">
        <h4 className="text-lg font-medium text-gray-200">{loan.bookTitle}</h4>

        <button
          className="p-1 cursor-pointer text-orange-200 hover:text-orange-300"
          onClick={onCancel}
        >
          <LucideX />
        </button>
      </div>
      <div className="p-3 flex flex-col gap-3 dark:border dark:border-gray-700 dark:border-t-0">
        <p className="text-md text-gray-800 dark:text-gray-300 font-medium flex items-center gap-2">
          <LucideUser
            size={20}
            className="text-indigo-600 dark:text-indigo-500"
          />
          {loan.userName}
        </p>

        <p className="text-gray-600 dark:text-gray-400 font-normal tracking-wide flex items-center gap-2">
          <LucideMail
            size={20}
            className="text-indigo-600 dark:text-indigo-500"
          />
          {loan.userEmail}
        </p>

        <span
          className={`capitalize text-sm py-1 px-3 w-max rounded-full font-medium ${
            statusClasses[loan.status]
          }`}
        >
          {loan.status}
        </span>
      </div>
    </li>
  );
};
