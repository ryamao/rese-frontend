import { useContext, useState } from "react";

import styled from "@emotion/styled";
import { Outlet, useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Client, GetAuthStatusResult } from "../Client";
import { MenuButton } from "../components/MenuButton";
import { Overlay } from "../components/Overlay";
import { AuthContext } from "../providers/AuthContextProvider";

export interface AppLayoutProps {
  httpClient: Client;
}

export function AppLayout({ httpClient }: AppLayoutProps) {
  const authStatus = useLoaderData() as GetAuthStatusResult;
  const authContext = useContext(AuthContext);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleHome() {
    setShowOverlay(false);
    navigate("/");
  }

  function handleRegister() {
    setShowOverlay(false);
    navigate("/register");
  }

  function handleLogin() {
    setShowOverlay(false);
    navigate("/login");
  }

  async function handleLogout() {
    const { error } = await httpClient.postAuthLogout();
    if (error) {
      throw new Error("ログアウトに失敗しました");
    }
    authContext.setGuest();
    setShowOverlay(false);
    navigate("/login");
  }

  function handleMypage() {
    setShowOverlay(false);
    navigate("/mypage");
  }

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
          onMenuClose={() => setShowOverlay(false)}
          onHome={handleHome}
          onRegister={handleRegister}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onMypage={handleMypage}
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
