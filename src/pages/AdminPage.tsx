import styled from "@emotion/styled";

import { PageBase } from "./PageBase";
import { CreateOwnerForm } from "../components/CreateOwnerForm";
import { OwnerList } from "../components/OwnerList";

export function AdminPage() {
  return (
    <PageBase>
      <Main>
        <OwnerArea>
          <CreateOwnerForm />
          <OwnerList />
        </OwnerArea>
        <div>dummy text</div>
      </Main>
    </PageBase>
  );
}

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  max-width: 1230px;
`;

const OwnerArea = styled.div`
  display: grid;
  gap: 1rem;
`;
