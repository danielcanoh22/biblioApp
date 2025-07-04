import {
  LucideBookUp,
  LucideMessageSquareText,
  LucideUser,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useState } from "react";
import { updateLoanStatus } from "~/services/apiLoans";
import type { UpdateLoanStatusApiDTO } from "~/schemas/loan";
import { LOAN_STATUS, type Loan } from "~/types/loans";
import { BadgeStatus } from "~/ui/badge-status";
import { Button } from "~/ui/button";

export const RequestDetail = ({ loan }: { loan: Loan }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateLoanStatus = async (isAccepted: boolean) => {
    setIsSubmitting(true);

    try {
      const payload: UpdateLoanStatusApiDTO = {
        status: isAccepted ? LOAN_STATUS.APPROVED : LOAN_STATUS.REFUSED,
      };

      if (comments.length > 0) payload.comments = comments;
      const result = await updateLoanStatus(loan.id, payload);

      if (!result.succeeded) {
        toast.error(result.message);
        return;
      }

      toast.success(`${result.message} 😄`);
      navigate("/admin/solicitudes");
    } catch (error) {
      toast.error("Ocurrió un error inesperado 🤔");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-sm dark:border dark:border-gray-700">
      <div className="bg-indigo-600 dark:bg-indigo-500 p-3 flex items-center justify-between">
        <h4 className="text-lg font-medium text-gray-200 tracking-wide">
          {loan?.book_title}
        </h4>
        <span className="text-gray-200">
          {new Date(loan?.loan_date).toDateString()}
        </span>
      </div>
      <div className="bg-white dark:bg-gray-800 p-3 flex flex-col gap-4">
        <p className="font-medium text-gray-800 dark:text-gray-300 tracking-wide flex items-center gap-1">
          <LucideUser className="text-indigo-500" />
          {loan?.user_name} -{" "}
          <span className="text-gray-500 dark:text-gray-400 font-normal">
            {loan?.user_email}
          </span>
        </p>
        <div className="font-medium text-gray-800 tracking-wide flex items-center gap-1">
          <LucideBookUp className="text-indigo-500" />
          <BadgeStatus status={loan?.status} />
        </div>

        <div className="mt-4 bg-yellow-100 dark:bg-yellow-800/60 p-4 rounded-lg flex flex-col gap-3 text-yellow-900 dark:text-yellow-100">
          <h5 className="font-medium flex items-center gap-1">
            <LucideMessageSquareText />
            <span>Comentarios (opcional)</span>
          </h5>

          <textarea
            name="comments"
            id="comments"
            rows={5}
            className="w-full border border-yellow-800 p-2 rounded-lg resize-none tracking-wide focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-yellow-500"
            placeholder="Agrega un comentario para indicarle al usuario el motivo de aprobación/rechazo de su solicitud."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center gap-2 mt-2 justify-end">
          <div>
            <Button
              variant="destructive"
              onClick={() => handleUpdateLoanStatus(false)}
              isDisabled={isSubmitting}
            >
              Rechazar préstamo
            </Button>
          </div>
          <div>
            <Button
              type="submit"
              onClick={() => handleUpdateLoanStatus(true)}
              isDisabled={isSubmitting}
            >
              Aceptar préstamo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
