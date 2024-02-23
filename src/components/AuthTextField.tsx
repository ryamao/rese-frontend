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
  width: 2.25rem;
  height: 2.25rem;
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
    font-size: 0.75rem;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  color: #888;
  font-size: 1rem;
  transition: 0.15s;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 1rem;

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
          type={getInputType(type)}
          id={props.name}
          className={filled ? "filled" : ""}
          {...props}
          onBlur={onBlur}
          ref={ref}
        />
        <Label htmlFor={props.name}>{getLabelText(type)}</Label>
      </Layout>
    </Wrapper>
  );
}
