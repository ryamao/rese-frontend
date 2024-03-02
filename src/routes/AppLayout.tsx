import { useContext, useState } from "react";

import styled from "@emotion/styled";
import { Outlet, useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Client, GetAuthStatusResult } from "../Client";
import { MenuButton } from "../components/MenuButton";
import { MenuButtonType, Overlay } from "../components/Overlay";
import { AuthContext } from "../providers/AuthContextProvider";

export interface AppLayoutProps {
  httpClient: Client;
}

export function AppLayout({ httpClient }: AppLayoutProps) {
  const authStatus = useLoaderData() as GetAuthStatusResult;
  const authContext = useContext(AuthContext);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const navigate = useNavigate();

  if (authContext.authStatus === null) {
    switch (authStatus.status) {
      case "guest":
        authContext.setGuest();
        break;
      case "customer":
        authContext.setCustomer(authStatus.id);
        break;
    }
  }

  async function logout() {
    const { error } = await httpClient.postAuthLogout();
    if (error) {
      throw new Error("ログアウトに失敗しました");
    }
    authContext.setGuest();
    setShowOverlay(false);
    navigate("/login");
  }

  async function handleClickMenuButton(type: MenuButtonType) {
    switch (type) {
      case "close":
        break;
      case "home":
        navigate("/");
        break;
      case "register":
        navigate("/register");
        break;
      case "login":
        navigate("/login");
        break;
      case "logout":
        logout();
        break;
      case "mypage":
        navigate("/mypage");
        break;
    }

    setShowOverlay(false);
  }

  return (
    <>
      <Header>
        <HeaderInner>
          <MenuButton onClick={() => setShowOverlay(true)} />
          <Title>Rese</Title>
        </HeaderInner>
      </Header>
      <Main>
        <Outlet />
      </Main>
      {showOverlay && (
        <Overlay
          authStatus={authContext.authStatus?.status || "guest"}
          onClickMenuButton={handleClickMenuButton}
        />
      )}
    </>
  );
}

const Header = styled.header`
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
  justify-content: center;
  align-items: center;
`;
