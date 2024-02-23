import { ChangeEventHandler } from "react";

import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { FaUser } from "react-icons/fa";

export interface UsernameInputFieldProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: () => void;
  ref?: React.RefObject<HTMLInputElement>;
  name?: string;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 0.5rem;
  }
`;

const iconStyle = css`
  width: 1.25rem;
  height: 1.25rem;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #000;

  &:focus-visible {
    outline: none;
  }
`;

export function UsernameInputField(props: UsernameInputFieldProps) {
  return (
    <Wrapper>
      <FaUser className={iconStyle} />
      <Input type="text" placeholder="Username" {...props} />
    </Wrapper>
  );
}
