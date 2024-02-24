import { ButtonHTMLAttributes } from "react";

import styled from "@emotion/styled";

const Button = styled.button`
  border: none;
  border-radius: 0.25rem;
  background-color: #315dff;
  color: #fff;
  padding: 0.35rem 0.9rem;
`;

export interface NormalButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function NormalButton({ text, ...props }: NormalButtonProps) {
  return <Button {...props}>{text}</Button>;
}
