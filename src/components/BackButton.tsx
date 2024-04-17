import styled from "@emotion/styled";

export interface BackButtonProps {
  onClick?: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return <Button onClick={onClick}>&lt;</Button>;
}

const Button = styled.button`
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  font-size: 1.125rem;
  color: #000;
  text-align: center;
  cursor: pointer;
  background-color: #fff;
  border: none;
  border-radius: 0.25rem;
  box-shadow: 0.125rem 0.125rem 0.25rem #888;
`;
