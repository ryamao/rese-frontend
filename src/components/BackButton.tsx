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
  font-size: 1.125rem;
  background-color: #fff;
  border: none;
  border-radius: 0.25rem;
  box-shadow: 0.125rem 0.125rem 0.25rem #888;
`;
