import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { MdMail, MdPerson } from "react-icons/md";

import { blueButton, whitePanel } from "./styles";

export function CreateOwnerForm() {
  return (
    <Form className={whitePanel}>
      <InputFieldWrapper>
        <MdPerson className={iconStyle} />
        <InputLayout>
          <Input type="text" id="name" />
          <Label htmlFor="name">Owner Name</Label>
        </InputLayout>
      </InputFieldWrapper>
      <InputFieldWrapper>
        <MdMail className={iconStyle} />
        <InputLayout>
          <Input type="email" id="email" />
          <Label htmlFor="email">Email Address</Label>
        </InputLayout>
      </InputFieldWrapper>
      <div>
        <button type="submit" className={blueButton}>
          アカウント作成
        </button>
      </div>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  gap: 2rem;
  align-items: center;
  width: fit-content;
  padding: 1rem 1.5rem;
`;

const InputFieldWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const iconStyle = css`
  width: 2rem;
  height: 2rem;
  color: #4b4b4b;
`;

const InputLayout = styled.div`
  position: relative;
  width: 100%;

  & input:focus + label,
  & input.filled + label {
    top: -1rem;
    font-size: 0.6rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0 0.125rem;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #000;

  &:focus-visible {
    outline: none;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  font-size: 0.9rem;
  color: #6b6b6b;
  pointer-events: none;
  transition: 0.15s;
`;
