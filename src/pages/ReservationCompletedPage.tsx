import styled from "@emotion/styled";

import { PageBase } from "./PageBase";
import { ReservationCompletedPanel } from "../components/ReservationCompletedPanel";

export function ReservationCompletedPage() {
  return (
    <PageBase>
      <Main>
        <ReservationCompletedPanel />
      </Main>
    </PageBase>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  padding: 4rem;
`;
