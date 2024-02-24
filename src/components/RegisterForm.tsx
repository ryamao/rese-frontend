import styled from "@emotion/styled";
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm
} from "react-hook-form";

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

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormValues) => void;
  onError: (errors: FieldErrors<RegisterFormValues>) => void;
}

export function RegisterForm({ onSubmit, onError }: RegisterFormProps) {
  const { register, handleSubmit } = useForm<RegisterFormValues>();

  const onValid: SubmitHandler<RegisterFormValues> = (data) => {
    onSubmit(data);
  };

  const onInvalid: SubmitErrorHandler<RegisterFormValues> = (error) => {
    onError(error);
  };

  return (
    <FormLayout>
      <Heading>Registration</Heading>
      <FormBody onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
        <TextFieldLayout>
          <AuthTextField
            registerReturn={register("name", {
              required: "名前を入力してください"
            })}
          />
          <AuthTextField
            registerReturn={register("email", {
              required: "メールアドレスを入力してください"
            })}
          />
          <AuthTextField
            registerReturn={register("password", {
              required: "パスワードを入力してください"
            })}
          />
        </TextFieldLayout>
        <ButtonLayout>
          <NormalButton type="submit" text="登録" />
        </ButtonLayout>
      </FormBody>
    </FormLayout>
  );
}
