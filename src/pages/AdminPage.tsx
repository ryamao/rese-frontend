import styled from "@emotion/styled";

import { PageBase } from "./PageBase";
import { CreateOwnerForm } from "../components/CreateOwnerForm";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";
import { PostOwnersBody } from "../models";
import { NotificationEmailForm } from "../components/NotificationEmailForm";

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
        <EmailArea>
          <NotificationEmailForm />
        </EmailArea>
      </Main>
    </PageBase>
  );
}

const Main = styled.main`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  max-width: 1230px;
  margin: 2rem 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    margin: 0;
  }
`;

const OwnerArea = styled.div`
  width: 24rem;
  margin: 0 auto;

  @media (max-width: 1024px) {
    margin: 0;
  }
`;

const EmailArea = styled.div`
`;
