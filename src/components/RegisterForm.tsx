import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { AuthTextField } from "./AuthTextField";
import * as styles from "./styles";
import { PostAuthRegisterBody, PostAuthRegisterResult } from "../HttpClient";

export interface RegisterFormProps {
  onRegister: (
    name: string,
    email: string,
    password: string
  ) => Promise<PostAuthRegisterResult>;
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

export function RegisterForm({ onRegister }: RegisterFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<PostAuthRegisterBody>({
    resolver: zodResolver(registerFormSchema)
  });

  const onValid: SubmitHandler<PostAuthRegisterBody> = async (body) => {
    const { error } = await onRegister(body.name, body.email, body.password);
    if (error) {
      setError("email", { message: error.message });
    }
  };

  return (
    <div className={styles.whitePanel}>
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
          <button type="submit" className={styles.blueButton}>
            登録
          </button>
        </ButtonLayout>
      </FormBody>
    </div>
  );
}

const Heading = styled.h2`
  padding: 1rem;
  margin: 0;
  font-size: 1rem;
  font-weight: normal;
  color: #fff;
  background-color: #315dff;
  border-radius: 0.25rem 0.25rem 0 0;
`;

const FormBody = styled.form`
  padding: 1.25rem 2rem;

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
  margin: 0;
  font-size: 0.75rem;
  color: #f00;
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
`;
