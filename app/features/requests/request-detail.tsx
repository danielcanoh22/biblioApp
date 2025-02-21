import {
  LucideBookUp,
  LucideMessageSquareText,
  LucideUser,
} from "lucide-react";
import { Form } from "react-router";
import { BadgeStatus } from "~/ui/badge-status";
import { Button } from "~/ui/button";

const request = {
  id: "req123",
  userName: "Daniel",
  userEmail: "daniel@test.com",
  bookTitle: "Harry Potter",
  status: "pendiente",
  requestDate: new Date().toLocaleDateString(),
};

export const RequestDetail = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm dark:border dark:border-gray-700">
      <div className="bg-indigo-600 dark:bg-indigo-500 p-3 flex items-center justify-between">
        <h4 className="text-lg font-medium text-gray-200 tracking-wide">
          {request.bookTitle}
        </h4>
        <span className="text-gray-200">{request.requestDate}</span>
      </div>
      <div className="bg-white dark:bg-gray-800 p-3 flex flex-col gap-4">
        <p className="font-medium text-gray-800 dark:text-gray-300 tracking-wide flex items-center gap-1">
          <LucideUser className="text-indigo-500" />
          {request.userName} -{" "}
          <span className="text-gray-500 dark:text-gray-400 font-normal">
            {request.userEmail}
          </span>
        </p>
        <p className="font-medium text-gray-800 tracking-wide flex items-center gap-1">
          <LucideBookUp className="text-indigo-500" />
          <BadgeStatus status={request.status} />
        </p>

        <Form>
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
            ></textarea>
          </div>
          <div className="flex items-center gap-2 mt-2 justify-self-end">
            <div>
              <Button variant="destructive">Rechazar préstamo</Button>
            </div>
            <div>
              <Button type="submit">Aceptar préstamo</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
