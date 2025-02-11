import type { Route } from "./+types/loan-form";
import { Form, redirect } from "react-router";

import { getBookById } from "~/services/apiBooks";
import { useMoveBack } from "~/hooks/useMoveBack";
import { Button } from "~/ui/button";
import { FormRow } from "~/ui/form-row";
import { Input } from "~/ui/input";
import { Message } from "~/ui/message";
import { createLoan } from "~/services/apiLoans";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const book = await getBookById(params.bookId);
  return { book };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const loan = await createLoan(
    data.bookId,
    "user123",
    data.name,
    data.email,
    data.bookTitle
  );

  return redirect(`/prestamos/${loan}`);
}

export default function LoanForm({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const moveBack = useMoveBack();
  const { book } = loaderData;

  return (
    <>
      <h1 className="text-2xl font-semibold dark:text-white mb-4">
        Confirmar préstamo
      </h1>
      <Message
        variant="info"
        text="Confirma tus datos antes de realizar el préstamo."
      />

      <Form method="post" className="mt-4 flex flex-col gap-4">
        <FormRow id="name" label="Nombre">
          <Input
            id="name"
            defaultValue="Daniel"
            placeholder="Ingresa tu nombre"
          />
        </FormRow>
        <FormRow id="email" label="Correo electrónico">
          <Input
            id="email"
            defaultValue="daniel@test.com"
            placeholder="Ingresa tu correo electrónico"
          />
        </FormRow>
        <FormRow id="bookTitle" label="Título del libro">
          <Input
            id="bookTitle"
            defaultValue={book?.title}
            placeholder="Título del libro"
            readOnly
          />
        </FormRow>
        <input type="hidden" name="bookId" value={book?.id} />

        <div className="flex items-center gap-2 mt-6">
          <Button variant="destructive" onClick={moveBack}>
            Cancelar
          </Button>
          <Button type="submit">Confirmar</Button>
        </div>
      </Form>

      {JSON.stringify(actionData)}
    </>
  );
}
