import styled from "@emotion/styled";

import { AuthTextField } from "./AuthTextField";
import { NormalButton } from "./NormalButton";

const FormLayout = styled.div`
  width: 22rem;
  border-radius: 0.25rem;
  box-shadow: 0.125rem 0.125rem 0.25rem #888;
`;

const Heading = styled.h2`
  background-color: #315dff;
  color: #fff;
  font-size: 1rem;
  font-weight: normal;
  border-radius: 0.25rem 0.25rem 0 0;
  margin: 0;
  padding: 1rem;
`;

const FormBody = styled.form`
  padding: 1.25rem 1.5rem;

  & > * + * {
    margin-top: 1.25rem;
  }
`;

const TextFieldLayout = styled.div`
  & > * + * {
    margin-top: 0.75rem;
  }
`;

const ButtonLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;

export function RegisterForm() {
  return (
    <FormLayout>
      <Heading>Registration</Heading>
      <FormBody>
        <TextFieldLayout>
          <AuthTextField type="username" />
          <AuthTextField type="email" />
          <AuthTextField type="password" />
        </TextFieldLayout>
        <ButtonLayout>
          <NormalButton text="登録" />
        </ButtonLayout>
      </FormBody>
    </FormLayout>
  );
}
