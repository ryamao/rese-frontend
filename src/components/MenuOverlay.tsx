import styled from "@emotion/styled";

import { MenuButton } from "./MenuButton";
import { AuthStatus } from "../models";

export type MenuButtonType =
  | "close"
  | "home"
  | "register"
  | "login"
  | "logout"
  | "mypage"
  | "admin"
  | "owner";

export interface OverlayProps {
  authStatus: AuthStatus;
  onClickMenuButton?: (type: MenuButtonType) => void;
}

export function MenuOverlay(props: OverlayProps) {
  return (
    <OverlayBody>
      <OverlayHeader>
        <MenuButton
          isMenuOpened
          onClick={() => props.onClickMenuButton?.("close")}
        />
      </OverlayHeader>
      <OverlayContent>{getLinks(props)}</OverlayContent>
    </OverlayBody>
  );
}

function getLinks({ authStatus, onClickMenuButton }: OverlayProps) {
  switch (authStatus.status) {
    case "guest":
      return linksForGuest(onClickMenuButton);
    case "admin":
      return linksForAdmin(onClickMenuButton);
    case "owner":
      return linksForOwner(onClickMenuButton);
    case "customer":
      return linksForCustomer(onClickMenuButton);
  }
}

function linksForGuest(onClickMenuButton: OverlayProps["onClickMenuButton"]) {
  return (
    <>
      <Button type="button" onClick={() => onClickMenuButton?.("home")}>
        Home
      </Button>
      <Button type="button" onClick={() => onClickMenuButton?.("register")}>
        Registration
      </Button>
      <Button type="button" onClick={() => onClickMenuButton?.("login")}>
        Login
      </Button>
    </>
  );
}

function linksForAdmin(onClickMenuButton: OverlayProps["onClickMenuButton"]) {
  return (
    <>
      <Button type="button" onClick={() => onClickMenuButton?.("home")}>
        Home
      </Button>
      <Button type="button" onClick={() => onClickMenuButton?.("logout")}>
        Logout
      </Button>
      <Button type="button" onClick={() => onClickMenuButton?.("admin")}>
        Mypage
      </Button>
    </>
  );
}

function linksForOwner(onClickMenuButton: OverlayProps["onClickMenuButton"]) {
  return (
    <>
      <Button type="button" onClick={() => onClickMenuButton?.("home")}>
        Home
      </Button>
      <Button type="button" onClick={() => onClickMenuButton?.("logout")}>
        Logout
      </Button>
      <Button type="button" onClick={() => onClickMenuButton?.("owner")}>
        Mypage
      </Button>
    </>
  );
}

function linksForCustomer(
  onClickMenuButton: OverlayProps["onClickMenuButton"]
) {
  return (
    <>
      <Button type="button" onClick={() => onClickMenuButton?.("home")}>
        Home
      </Button>
      <Button type="button" onClick={() => onClickMenuButton?.("logout")}>
        Logout
      </Button>
      <Button type="button" onClick={() => onClickMenuButton?.("mypage")}>
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
  margin: 0 auto;
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
  font-size: 1.6rem;
  color: #315dff;
  cursor: pointer;
  background-color: #fff;
  border: none;
`;
