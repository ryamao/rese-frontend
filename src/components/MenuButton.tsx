import { css } from "@emotion/css";
import styled from "@emotion/styled";

const menuSvgStyle = css`
  width: 75%;
  height: 75%;
`;

const menuSvg = (
  <svg
    width="40"
    height="30"
    viewBox="0 0 40 30"
    xmlns="http://www.w3.org/2000/svg"
    className={menuSvgStyle}
  >
    <path d="M0,0 L20,0" stroke="white" strokeWidth="2" />
    <path d="M0,15 L40,15" stroke="white" strokeWidth="2" />
    <path d="M0,30 L10,30" stroke="white" strokeWidth="2" />
  </svg>
);

const closeSvgStyle = css`
  width: 50%;
  height: 50%;
`;

const closeSvg = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    xmlns="http://www.w3.org/2000/svg"
    className={closeSvgStyle}
  >
    <path d="M0,0 L30,30" stroke="white" strokeWidth="2" />
    <path d="M30,0 L0,30" stroke="white" strokeWidth="2" />
  </svg>
);

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  background-color: #315dff;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0.125rem 0.125rem 0.25rem #888;
`;

export interface MenuButtonProps {
  isMenuOpened?: boolean;
  onClick?: () => void;
}

export function MenuButton({ isMenuOpened = false, onClick }: MenuButtonProps) {
  return (
    <Button
      onClick={onClick}
      aria-label={isMenuOpened ? "メニューを閉じる" : "メニューを開く"}
    >
      {isMenuOpened ? closeSvg : menuSvg}
    </Button>
  );
}
