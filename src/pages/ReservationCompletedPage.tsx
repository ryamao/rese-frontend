import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { ReservationCompletedPanel } from "../components/ReservationCompletedPanel";

export function ReservationCompletedPage() {
  const navigate = useNavigate();

  function handleConfirm() {
    navigate(-1);
  }

  return (
    <PageBase>
      <Main>
        <ReservationCompletedPanel onConfirm={handleConfirm} />
      </Main>
    </PageBase>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  padding-top: 4rem;
`;
