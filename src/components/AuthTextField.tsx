import { ChangeEventHandler } from "react";
import { useRef, useState } from "react";

import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";

export type AuthTextFieldType = "username" | "email" | "password";

export interface AuthTextFieldProps {
  type: AuthTextFieldType;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: () => void;
  ref?: React.RefObject<HTMLInputElement>;
  name?: string;
}

function getIcon(type: AuthTextFieldType) {
  switch (type) {
    case "username":
      return MdPerson;
    case "email":
      return MdEmail;
    case "password":
      return MdLock;
  }
}

function getInputType(type: AuthTextFieldType) {
  switch (type) {
    case "username":
      return "text";
    case "email":
      return "email";
    case "password":
      return "password";
  }
}

function getLabelText(type: AuthTextFieldType) {
  switch (type) {
    case "username":
      return "Username";
    case "email":
      return "Email";
    case "password":
      return "Password";
  }
}

const iconClass = css`
  width: 2rem;
  height: 2rem;
  color: #4b4b4b;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 0.5rem;
  }
`;

const Layout = styled.div`
  position: relative;
  width: 100%;

  & input:focus + label,
  & input.filled + label {
    top: -1rem;
    font-size: 0.6rem;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  color: #6b6b6b;
  font-size: 0.9rem;
  transition: 0.15s;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #000;
  padding: 0 0.125rem;

  &:focus-visible {
    outline: none;
  }
`;

export function AuthTextField({ type, ...props }: AuthTextFieldProps) {
  let ref = useRef<HTMLInputElement>(null);
  ref = props.ref || ref;

  const [filled, setFilled] = useState(false);

  const onBlur = () => {
    setFilled(!!ref.current?.value);
    props.onBlur?.();
  };

  const Icon = getIcon(type);

  return (
    <Wrapper>
      <Icon type={type} className={iconClass} />
      <Layout>
        <Input
          data-testid={`input-${type}`}
          type={getInputType(type)}
          id={type}
          className={filled ? "filled" : ""}
          {...props}
          onBlur={onBlur}
          ref={ref}
        />
        <Label htmlFor={type}>{getLabelText(type)}</Label>
      </Layout>
    </Wrapper>
  );
}
