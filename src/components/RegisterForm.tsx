import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { AuthTextField } from "./AuthTextField";
import { NormalButton } from "./NormalButton";

const FormLayout = styled.div`
  width: 22rem;
  border-radius: 0.25rem;
  box-shadow: 0.125rem 0.125rem 0.25rem #888;
  background-color: #fff;
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

const TextFieldList = styled.ul`
  padding: 0;

  & > * + * {
    margin-top: 0.75rem;
  }
`;

const TextFieldListItem = styled.li`
  list-style: none;
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 0.75rem;
  margin: 0;
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
  onSubmit?: (data: RegisterFormValues) => void;
  onError?: (errors: FieldErrors<RegisterFormValues>) => void;
}

const registerFormSchema = z.object({
  name: z
    .string()
    .min(1, "名前を入力してください")
    .max(100, "名前は100文字以内で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .max(100, "メールアドレスは100文字以内で入力してください")
    .email("メールアドレスの形式が正しくありません"),
  password: z
    .string()
    .min(1, "パスワードを入力してください")
    .min(8, "パスワードは8文字以上で入力してください")
    .max(100, "パスワードは100文字以内で入力してください")
});

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema)
  });

  const onValid: SubmitHandler<RegisterFormValues> = (data) => {
    onSubmit?.(data);
  };

  return (
    <FormLayout>
      <Heading>Registration</Heading>
      <FormBody onSubmit={handleSubmit(onValid)} noValidate>
        <TextFieldList>
          <TextFieldListItem>
            <AuthTextField registerReturn={register("name")} />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </TextFieldListItem>
          <TextFieldListItem>
            <AuthTextField registerReturn={register("email")} />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </TextFieldListItem>
          <TextFieldListItem>
            <AuthTextField registerReturn={register("password")} />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </TextFieldListItem>
        </TextFieldList>
        <ButtonLayout>
          <NormalButton type="submit" text="登録" />
        </ButtonLayout>
      </FormBody>
    </FormLayout>
  );
}
