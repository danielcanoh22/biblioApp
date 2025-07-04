import type { Route } from "./+types/loan-form";
import { redirect, useFetcher } from "react-router";
import { getBookById } from "~/services/apiBooks";
import { useMoveBack } from "~/hooks/useMoveBack";
import { Button } from "~/ui/button";
import { FormRow } from "~/ui/form-row";
import { Input } from "~/ui/input";
import { Message } from "~/ui/message";
import { Container } from "~/ui/container";
import { ButtonBack } from "~/ui/button-back";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoanFormValues } from "~/types/loans";
import { createLoan } from "~/services/apiLoans";
import { createLoanApiSchema } from "~/schemas/loan";
import toast from "react-hot-toast";
import { getProfile } from "~/services/apiAuth";
import { getUserById } from "~/services/apiUsers";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const session = await getProfile();

  if (!session.succeeded) {
    toast.error("Error al obtener la información del usuario activo");
    return null;
  }

  const userData = await getUserById(String(session.data.user.id));
  const book = await getBookById(params.bookId);

  return { book, userData };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const validationResult = createLoanApiSchema.safeParse(data);

  if (!validationResult.success) {
    toast.error("Por favor, corrige los errores del formulario");
    return { errors: validationResult.error.flatten().fieldErrors };
  }

  const result = await createLoan(validationResult.data);

  if (!result?.succeeded) {
    toast.error(result.message);
    return null;
  }

  toast.success("Solicitud de préstamo creada correctamente 😄");

  return redirect("/prestamos");
}

export default function LoanForm({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const moveBack = useMoveBack();
  const result = loaderData;

  if (!result || !result?.book.succeeded || !result?.userData.succeeded)
    return (
      <div className="flex flex-col gap-4">
        <ButtonBack />
        <Message
          variant="warning"
          text="Ha ocurrido un error al obtener la información del usuario o del libro"
        />
      </div>
    );

  const fetcher = useFetcher();

  const book = result.book.data;
  const user = result.userData.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanFormValues>({
    defaultValues: {
      user_name: user?.name,
      user_email: user?.email,
      book_id: book?.id,
      book_title: book?.title,
    },
  });

  const onSubmit: SubmitHandler<LoanFormValues> = (data) => {
    const { book_title, ...loanData } = data;
    fetcher.submit(loanData, { method: "post" });
  };

  return (
    <Container>
      <h1 className="text-2xl font-semibold dark:text-white mb-4">
        Confirmar préstamo
      </h1>
      <Message
        variant="info"
        text="Confirma tus datos antes de realizar el préstamo."
      />

      <fetcher.Form
        method="post"
        className="mt-4 flex flex-col gap-4 max-w-[600px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormRow
          id="user_name"
          label="Nombre"
          error={errors.user_name?.message}
        >
          <Input
            id="user_name"
            placeholder="Ingresa tu nombre"
            {...register("user_name", {
              required: "El nombre del usuario es obligatorio",
              minLength: {
                value: 2,
                message: "Debe tener al menos 2 caracteres.",
              },
            })}
          />
        </FormRow>
        <FormRow
          id="user_email"
          label="Correo electrónico"
          error={errors.user_email?.message}
        >
          <Input
            id="user_email"
            placeholder="Ingresa tu correo electrónico"
            readOnly
            {...register("user_email", {
              required: "El correo electrónico es obligatorio.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "El formato del correo electrónico no es válido.",
              },
            })}
          />
        </FormRow>
        <FormRow id="book_title" label="Título del libro">
          <Input
            id="book_title"
            placeholder="Título del libro"
            readOnly
            {...register("book_title", {
              required: "El título del libro es obligatorio",
            })}
          />
        </FormRow>
        <input
          type="hidden"
          id="book_id"
          {...register("book_id", { valueAsNumber: true })}
        />

        <div className="flex items-center gap-2 mt-6">
          <Button variant="destructive" onClick={moveBack}>
            Cancelar
          </Button>
          <Button type="submit">Confirmar</Button>
        </div>
      </fetcher.Form>

      {JSON.stringify(actionData)}
    </Container>
  );
}
