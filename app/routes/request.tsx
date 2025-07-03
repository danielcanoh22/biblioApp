import type { ClientLoaderFunctionArgs } from "react-router";
import { RequestDetail } from "~/features/requests/request-detail";
import { getLoanById } from "~/services/apiLoans";
import { ButtonBack } from "~/ui/button-back";
import { Container } from "~/ui/container";
import { PrimaryTitle } from "~/ui/titles";
import type { Route } from "./+types/request";
import { Message } from "~/ui/message";

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const result = await getLoanById(args.params?.requestId || "");

  return result;
}

export default function Request({ loaderData }: Route.ComponentProps) {
  const loanData = loaderData;

  if (!loanData.succeeded)
    return (
      <Message
        variant="warning"
        text="Ha ocurrido un error al cargar la solicitud de préstamo"
      />
    );

  return (
    <Container>
      <div className="flex items-center justify-between">
        <PrimaryTitle text="Detalles de la Solicitud" />
        <ButtonBack />
      </div>
      <RequestDetail loan={loanData.data} />
    </Container>
  );
}
