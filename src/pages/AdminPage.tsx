import styled from "@emotion/styled";

import { PageBase } from "./PageBase";
import { CreateOwnerForm } from "../components/CreateOwnerForm";
import { NotificationEmailForm } from "../components/NotificationEmailForm";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";
import { PostNotificationEmailBody, PostOwnersBody } from "../models";

export function AdminPage() {
  const { postOwners, postNotificationEmail } = useBackendAccessContext();

  function handleCreateOwner(body: PostOwnersBody) {
    return postOwners(body);
  }

  function handleSendNotificationEmail(body: PostNotificationEmailBody) {
    return postNotificationEmail(body);
  }

  return (
    <PageBase>
      <Main>
        <OwnerArea>
          <CreateOwnerForm onSubmit={handleCreateOwner} />
        </OwnerArea>
        <div>
          <NotificationEmailForm onSubmit={handleSendNotificationEmail} />
        </div>
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

  @media (width <= 1024px) {
    grid-template-columns: 1fr;
    margin: 0;
  }
`;

const OwnerArea = styled.div`
  width: 24rem;
  margin: 0 auto;

  @media (width <= 1024px) {
    margin: 0;
  }
`;
