import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";

import { PageBase } from "./PageBase";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";

export function DashboardPage() {
  const { authStatus, getCustomer } = useBackendAccessContext();

  const id = authStatus?.status === "customer" ? authStatus.id : 0;

  const { data, isLoading } = useQuery({
    queryKey: ["getCustomer", id],
    queryFn: () => getCustomer(id)
  });

  if (isLoading) {
    return (
      <PageBase>
        <div>Loading...</div>
      </PageBase>
    );
  }

  if (!data) {
    return (
      <PageBase>
        <div>Error</div>
      </PageBase>
    );
  }

  return (
    <PageBase>
      <Inner>
        <Name>{data.name}さん</Name>
      </Inner>
    </PageBase>
  );
}

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;
