import { css } from "@emotion/css";
import * as emotion from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { MenuButton } from "../components/MenuButton";
import { MenuButtonType, MenuOverlay } from "../components/MenuOverlay";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";
import { useMenuOverlayContext } from "../contexts/MenuOverlayContext";

export type LayoutType = "normal" | "search" | "detail";

export interface PageBaseProps {
  children?: React.ReactNode;
  wrapperStyle?: string;
}

export function PageBase({ children, wrapperStyle }: PageBaseProps) {
  const { authStatus, setAuthStatus, logout } = useBackendAccessContext();
  const { isOpen, open, close } = useMenuOverlayContext();
  const navigate = useNavigate();

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
        await logout();
        setAuthStatus(undefined);
        navigate("/login");
        break;
      case "mypage":
        navigate("/mypage");
        break;
    }

    close();
  }

  return (
    <>
      <emotion.Global styles={global} />
      <div className={wrapperStyle ?? normalStyle}>
        <Header>
          <MenuButton onClick={open} />
          <Title>Rese</Title>
        </Header>
        {children}
      </div>
      {isOpen && (
        <MenuOverlay
          authStatus={authStatus?.status ?? "guest"}
          onClickMenuButton={handleClickMenuButton}
        />
      )}
    </>
  );
}

const global = emotion.css`
  body {
    margin: 0;
    background-color: #eee;
  }
`;

const normalStyle = css`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  row-gap: 2rem;
  max-width: 1230px;
  padding: 2rem;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  width: 100%;
`;

const Title = styled.h1`
  padding-left: 1rem;
  margin: 0;
  font-size: 1.5rem;
  color: #315dff;
`;
