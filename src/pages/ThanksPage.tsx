import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { ThanksPanel } from "../components/ThanksPanel";

export function ThanksPage() {
  const navigate = useNavigate();

  function handleConfirm() {
    navigate("/mypage");
  }

  return (
    <PageBase>
      <Main>
        <ThanksPanel onConfirm={handleConfirm} />
      </Main>
    </PageBase>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  padding-top: 10rem;

  @media (width <= 768px) {
    padding-top: 5rem;
  }
`;
