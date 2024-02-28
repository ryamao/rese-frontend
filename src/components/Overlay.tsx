import styled from "@emotion/styled";

import { MenuButton } from "./MenuButton";

export interface OverlayProps {
  authStatus: "guest" | "customer";
  onMenuClose: () => void;
  onHome: () => void;
  onRegister: () => void;
  onLogin: () => void;
  onLogout: () => void;
  onMypage: () => void;
}

export function Overlay(props: OverlayProps) {
  return (
    <OverlayBody>
      <OverlayHeader>
        <MenuButton isMenuOpened onClick={props.onMenuClose} />
      </OverlayHeader>
      <OverlayContent>{getLinks(props)}</OverlayContent>
    </OverlayBody>
  );
}

function getLinks(props: OverlayProps) {
  switch (props.authStatus) {
    case "guest":
      return linksForGuest(props);
    case "customer":
      return linksForCustomer(props);
  }
}

function linksForGuest({ onHome, onRegister, onLogin }: OverlayProps) {
  return (
    <>
      <Button type="button" onClick={onHome}>
        Home
      </Button>
      <Button type="button" onClick={onRegister}>
        Registration
      </Button>
      <Button type="button" onClick={onLogin}>
        Login
      </Button>
    </>
  );
}

function linksForCustomer({ onHome, onLogout, onMypage }: OverlayProps) {
  return (
    <>
      <Button type="button" onClick={onHome}>
        Home
      </Button>
      <Button type="button" onClick={onLogout}>
        Logout
      </Button>
      <Button type="button" onClick={onMypage}>
        Mypage
      </Button>
    </>
  );
}

const OverlayBody = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const OverlayHeader = styled.div`
  width: 100%;
  max-width: 1230px;
  padding: 2rem;
`;

const OverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  & > * + * {
    margin-top: 1rem;
  }
`;

const Button = styled.button`
  background-color: #fff;
  border: none;
  font-size: 1.6rem;
  color: #315dff;
  cursor: pointer;
`;
