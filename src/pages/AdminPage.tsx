import styled from "@emotion/styled";

import { PageBase } from "./PageBase";
import { CreateOwnerForm } from "../components/CreateOwnerForm";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";
import { PostOwnersBody } from "../models";

export function AdminPage() {
  const { postOwners } = useBackendAccessContext();

  function handleCreateOwner(body: PostOwnersBody) {
    return postOwners(body);
  }

  return (
    <PageBase>
      <Main>
        <OwnerArea>
          <CreateOwnerForm onSubmit={handleCreateOwner} />
        </OwnerArea>
        <div>dummy text</div>
      </Main>
    </PageBase>
  );
}

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 1230px;
`;

const OwnerArea = styled.div`
  margin: 2rem auto;
`;
