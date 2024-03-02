import { useState } from "react";

import { css } from "@emotion/css";
import { Global, css as reactCss } from "@emotion/react";
import styled from "@emotion/styled";

import { MenuButton } from "../components/MenuButton";
import { Overlay } from "../components/Overlay";

export type AuthStatus = "guest" | "customer";
export type LayoutType = "normal" | "search" | "detail";
export type MenuItem = "home" | "register" | "login" | "logout" | "mypage";

export interface PageBaseProps {
  children: React.ReactNode;
  wrapperStyle?: string;
  authStatus: AuthStatus;
  onClickMenuItem: (item: MenuItem) => void;
}

export function PageBase({
  children,
  wrapperStyle,
  authStatus,
  onClickMenuItem
}: PageBaseProps) {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  return (
    <>
      <Global styles={global} />
      <div className={wrapperStyle ?? normalStyle}>
        <Header>
          <HeaderInner>
            <MenuButton onClick={() => setShowOverlay(true)} />
            <Title>Rese</Title>
          </HeaderInner>
        </Header>
        {children}
      </div>
      {showOverlay && (
        <Overlay
          authStatus={authStatus}
          onMenuClose={() => setShowOverlay(false)}
          onHome={() => onClickMenuItem("home")}
          onRegister={() => onClickMenuItem("register")}
          onLogin={() => onClickMenuItem("login")}
          onLogout={() => onClickMenuItem("logout")}
          onMypage={() => onClickMenuItem("mypage")}
        />
      )}
    </>
  );
}

const global = reactCss`
  body {
    margin: 0;
    background-color: #eee;
  }
`;

const normalStyle = css`
  max-width: 1230px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  row-gap: 2rem;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  padding-left: 1rem;
  margin: 0;
  font-size: 1.5rem;
  color: #315dff;
`;
