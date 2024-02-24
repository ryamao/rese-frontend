import { FocusEventHandler, InputHTMLAttributes } from "react";
import { useState } from "react";

import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { UseFormRegisterReturn } from "react-hook-form";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";

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

export type AuthTextFieldType = "name" | "email" | "password";

export interface AuthTextFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  fieldType?: AuthTextFieldType;
  registerReturn?: UseFormRegisterReturn<AuthTextFieldType>;
}

function getIcon(type: AuthTextFieldType) {
  switch (type) {
    case "name":
      return MdPerson;
    case "email":
      return MdEmail;
    case "password":
      return MdLock;
  }
}

function getInputType(type: AuthTextFieldType) {
  switch (type) {
    case "name":
      return "text";
    case "email":
      return "email";
    case "password":
      return "password";
  }
}

function getLabelText(type: AuthTextFieldType) {
  switch (type) {
    case "name":
      return "Username";
    case "email":
      return "Email";
    case "password":
      return "Password";
  }
}

export function AuthTextField({
  fieldType,
  registerReturn,
  ...props
}: AuthTextFieldProps) {
  const [filled, setFilled] = useState(false);

  const onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    setFilled(!!event.target.value);
    registerReturn?.onBlur(event);
  };

  const name = fieldType || registerReturn?.name || "name";

  const Icon = getIcon(name);

  const inputProps = {
    ...props,
    type: getInputType(name),
    id: name,
    className: filled ? "filled" : "",
    ...registerReturn,
    onBlur
  };

  return (
    <Wrapper>
      <Icon type={name} className={iconClass} />
      <Layout>
        <Input {...inputProps} />
        <Label htmlFor={name}>{getLabelText(name)}</Label>
      </Layout>
    </Wrapper>
  );
}
