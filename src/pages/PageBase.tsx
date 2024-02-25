import styled from "@emotion/styled";

import { MenuButton } from "../components/MenuButton";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1230px;
  padding: 2rem;
`;

const Title = styled.h1`
  padding-left: 1rem;
  margin: 0;
  font-size: 1.5rem;
  color: #315dff;
`;

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  min-height: 100vh;
`;

export interface PageBaseProps {
  onMenuButtonClick?: () => void;
  children: React.ReactNode;
}

export function PageBase(props: PageBaseProps) {
  return (
    <>
      <Header>
        <HeaderInner>
          <MenuButton onClick={props.onMenuButtonClick} />
          <Title>Rese</Title>
        </HeaderInner>
      </Header>
      <Main>{props.children}</Main>
    </>
  );
}
