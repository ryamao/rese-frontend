import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { MenuButton } from "./MenuButton";

export interface OverlayProps {
  authStatus: "guest" | "customer";
  closeOverlay: () => void;
  onLogout: () => void;
}

export function Overlay(props: OverlayProps) {
  return (
    <OverlayBody>
      <OverlayHeader>
        <MenuButton isMenuOpened onClick={props.closeOverlay} />
      </OverlayHeader>
      <OverlayContent>{getLinks(props)}</OverlayContent>
    </OverlayBody>
  );
}

function getLinks({ authStatus, closeOverlay, onLogout }: OverlayProps) {
  switch (authStatus) {
    case "guest":
      return linksForGuest(closeOverlay);
    case "customer":
      return linksForCustomer(closeOverlay, onLogout);
  }
}

function linksForGuest(closeOverlay: () => void) {
  return (
    <>
      <Link to="/" onClick={closeOverlay}>
        Home
      </Link>
      <Link to="/register" onClick={closeOverlay}>
        Registration
      </Link>
      <Link to="/login" onClick={closeOverlay}>
        Login
      </Link>
    </>
  );
}

function linksForCustomer(closeOverlay: () => void, onLogout: () => void) {
  return (
    <>
      <Link to="/" onClick={closeOverlay}>
        Home
      </Link>
      <Logout type="button" onClick={onLogout}>
        Logout
      </Logout>
      <Link to="/mypage" onClick={closeOverlay}>
        Mypage
      </Link>
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

  & > a {
    text-decoration: none;
    font-size: 1.6rem;
    color: #315dff;
  }

  & > * + * {
    margin-top: 1rem;
  }
`;

const Logout = styled.button`
  background-color: #fff;
  border: none;
  font-size: 1.6rem;
  color: #315dff;
  cursor: pointer;
`;
