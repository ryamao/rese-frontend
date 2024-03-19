import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { MdLock, MdMail, MdPerson } from "react-icons/md";

import { blueButton, whitePanel } from "./styles";

export function CreateOwnerForm() {
  return (
    <FormWrapper className={whitePanel}>
      <Heading>Owner Registration</Heading>
      <Form>
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
        <InputFieldWrapper>
          <MdLock className={iconStyle} />
          <InputLayout>
            <Input type="password" id="password" />
            <Label htmlFor="password">Password</Label>
          </InputLayout>
        </InputFieldWrapper>
        <ButtonLayout>
          <button type="submit" className={blueButton}>
            アカウント作成
          </button>
        </ButtonLayout>
      </Form>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
width: 24rem;
`;

const Heading = styled.h2`
  padding: 1rem;
  margin: 0;
  font-size: 1rem;
  font-weight: normal;
  color: #fff;
  background-color: #315dff;
  border-radius: 0.25rem 0.25rem 0 0;
`;

const Form = styled.form`
  display: grid;
  grid-template-rows: repeat(4, auth);
  gap: 1rem;
  align-items: flex-end;
  padding: 1.5rem;
`;

const InputFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-right: 0.5rem;
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

const ButtonLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;
