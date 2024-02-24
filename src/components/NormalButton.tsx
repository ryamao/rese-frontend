import { ButtonHTMLAttributes } from "react";

import styled from "@emotion/styled";

const Button = styled.button`
  padding: 0.35rem 0.9rem;
  color: #fff;
  background-color: #315dff;
  border: none;
  border-radius: 0.25rem;
`;

export interface NormalButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function NormalButton({ text, ...props }: NormalButtonProps) {
  return <Button {...props}>{text}</Button>;
}
