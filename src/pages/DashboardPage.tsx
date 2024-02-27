import styled from "@emotion/styled";

import { PageBase } from "./PageBase";

export function DashboardPage() {
  const name = "test";

  return (
    <PageBase>
      <Inner>
        <Name>{name}さん</Name>
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
