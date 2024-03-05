import { useState } from "react";

import { css } from "@emotion/css";
import { Global, css as reactCss } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { MenuButton } from "../components/MenuButton";
import { MenuButtonType, MenuOverlay } from "../components/MenuOverlay";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";

export type LayoutType = "normal" | "search" | "detail";

export interface PageBaseProps {
  children?: React.ReactNode;
  wrapperStyle?: string;
}

export function PageBase({ children, wrapperStyle }: PageBaseProps) {
  const { authStatus, logout } = useBackendAccessContext();
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
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
        navigate("/login");
        break;
      case "mypage":
        navigate("/mypage");
        break;
    }

    setIsOverlayVisible(false);
  }

  return (
    <>
      <Global styles={global} />
      <div className={wrapperStyle ?? normalStyle}>
        <Header>
          <HeaderInner>
            <MenuButton onClick={() => setIsOverlayVisible(true)} />
            <Title>Rese</Title>
          </HeaderInner>
        </Header>
        {children}
      </div>
      {isOverlayVisible && (
        <MenuOverlay
          authStatus={authStatus?.status ?? "guest"}
          onClickMenuButton={handleClickMenuButton}
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
