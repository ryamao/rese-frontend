import styled from "@emotion/styled";

const Button = styled.button`
  border: none;
  border-radius: 0.25rem;
  background-color: #315dff;
  color: #fff;
  padding: 0.35rem 0.85rem;
`;

export interface NormalButtonProps {
  text: string;
  onClick?: () => void;
}

export function NormalButton({ text, onClick }: NormalButtonProps) {
  return <Button onClick={onClick}>{text}</Button>;
}
