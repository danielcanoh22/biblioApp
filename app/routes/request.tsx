import { RequestDetail } from "~/features/requests/request-detail";
import { ButtonBack } from "~/ui/button-back";
import { Container } from "~/ui/container";
import { PrimaryTitle } from "~/ui/titles";

export default function Request() {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <PrimaryTitle text="Detalles de la Solicitud" />
        <ButtonBack />
      </div>
      <RequestDetail />
    </Container>
  );
}
