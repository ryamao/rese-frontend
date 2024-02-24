import styled from "@emotion/styled";

import { MenuButton } from "../components/MenuButton";
import { RegisterForm } from "../components/RegisterForm";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1230px;
  padding: 2rem;
`;

const Title = styled.h1`
  margin: 0;
  padding-left: 1rem;
  font-size: 1.5rem;
  color: #315dff;
`;

const Main = styled.main`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div``;

export function RegisterPage() {
  return (
    <>
      <Header>
        <HeaderInner>
          <MenuButton />
          <Title>Rese</Title>
        </HeaderInner>
      </Header>
      <Main>
        <Content>
          <RegisterForm
            onSubmit={(data) => {
              alert(JSON.stringify(data, null, 2));
            }}
          />
        </Content>
      </Main>
    </>
  );
}
