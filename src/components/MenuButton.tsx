import { css } from "@emotion/css";
import styled from "@emotion/styled";

const Button = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #315dff;
  box-shadow: 0.125rem 0.125rem 0.25rem #888;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const iconStyle = css`
  width: 1.25rem;
  height: 1.25rem;
`;

export interface MenuButtonProps {
  onClick?: () => void;
}

export function MenuButton({ onClick }: MenuButtonProps) {
  return (
    <Button onClick={onClick}>
      <svg
        width="40"
        height="30"
        viewBox="0 0 40 30"
        xmlns="http://www.w3.org/2000/svg"
        className={iconStyle}
      >
        <rect x="0" y="0" width="20" height="1.5" fill="white" />
        <rect x="0" y="15" width="40" height="1.5" fill="white" />
        <rect x="0" y="30" width="10" height="1.5" fill="white" />
      </svg>
    </Button>
  );
}
