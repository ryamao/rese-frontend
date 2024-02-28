import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";

import { Client } from "../Client";

export interface DashboardPageProps {
  client: Client;
}

export function DashboardPage({ client }: DashboardPageProps) {
  const { id } = useOutletContext<{ id: number }>();
  const { data } = useQuery({
    queryKey: ["getCustomer", id],
    queryFn: () => client.getCustomer(id)
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Inner>
      <Name>{data.name}さん</Name>
    </Inner>
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
