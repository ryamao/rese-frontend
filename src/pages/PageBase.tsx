import { useContext, useState } from "react";

import { css } from "@emotion/css";
import { Global, css as reactCss } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { MenuButton } from "../components/MenuButton";
import { MenuButtonType, Overlay } from "../components/Overlay";
import { AuthContext } from "../providers/AuthContextProvider";

export type LayoutType = "normal" | "search" | "detail";

export interface PageBaseProps {
  children: React.ReactNode;
  wrapperStyle?: string;
  postLogout: () => Promise<void>;
}

export function PageBase({
  children,
  wrapperStyle,
  postLogout
}: PageBaseProps) {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const { authStatus, setGuest } = useContext(AuthContext);
  const navigate = useNavigate();

  async function logout() {
    await postLogout();
    setGuest();
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
        await logout();
        navigate("/login");
        break;
      case "mypage":
        navigate("/mypage");
        break;
    }

    setShowOverlay(false);
  }

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
