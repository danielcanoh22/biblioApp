import type { ClientLoaderFunctionArgs } from "react-router";
import { getLoanById } from "~/services/apiLoans";
import type { Route } from "./+types/request";
import { RequestDetail } from "~/features/requests/request-detail";
import { ButtonBack } from "~/ui/button-back";
import { Container } from "~/ui/container";
import { PrimaryTitle } from "~/ui/titles";
import { Message } from "~/ui/message";

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const result = await getLoanById(args.params?.requestId || "");

  if (!result.succeeded) {
    return null;
  }

  return result;
}

export default function Request({ loaderData }: Route.ComponentProps) {
  const result = loaderData;

  if ((result && !result.succeeded) || !result)
    return (
      <Message
        variant="warning"
        text="Ha ocurrido un error al cargar la solicitud de préstamo"
      />
    );

  const loanData = result.data;

  return (
    <Container>
      <div className="flex items-center justify-between">
        <PrimaryTitle text="Detalles de la Solicitud" />
        <ButtonBack />
      </div>
      <RequestDetail loan={loanData} />
    </Container>
  );
}
