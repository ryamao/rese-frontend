import { useContext } from "react";

import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useOutletContext } from "react-router-dom";

import { PageBase } from "./PageBase";
import { Client } from "../Client";
import { AuthContext } from "../providers/AuthContextProvider";

export interface DashboardPageProps {
  client: Client;
}

export function DashboardPage({ client }: DashboardPageProps) {
  const setGuest = useContext(AuthContext).setGuest;
  const navigate = useNavigate();
  const { id } = useOutletContext<{ id: number }>();
  const { data } = useQuery({
    queryKey: ["getCustomer", id],
    queryFn: () => client.getCustomer(id)
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  async function handleLogout() {
    const { error } = await client.postAuthLogout();
    if (error) {
      alert("ログアウトに失敗しました\n" + error);
    } else {
      setGuest();
      navigate("/login");
    }
  }

  return (
    <PageBase>
      <Inner>
        <Name>{data.name}さん</Name>
        <button onClick={handleLogout}>ログアウト</button>
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
