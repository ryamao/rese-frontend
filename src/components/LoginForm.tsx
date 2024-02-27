import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AuthTextField } from "./AuthTextField";
import * as styles from "./styles";
import { Client } from "../Client";
import { PostAuthLoginBody } from "../models";

const FormLayout = styled.div`
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

const loginFormSchema = z.object({
  email: z.string().min(1, "メールアドレスを入力してください"),
  password: z.string().min(1, "パスワードを入力してください")
});

export interface LoginFormProps {
  client: Client;
  onLogin?: () => void;
}

export function LoginForm({ client, onLogin }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<PostAuthLoginBody>({
    resolver: zodResolver(loginFormSchema)
  });

  async function onValid(data: PostAuthLoginBody) {
    const result = await client.postAuthLogin(data);
    switch (result.status) {
      case 200:
        onLogin?.();
        break;
      case 422:
        setError("email", { message: result.json.errors.email?.[0] });
        setError("password", { message: result.json.errors.password?.[0] });
        break;
      default:
        setError("email", { message: String(result.error) });
        break;
    }
  }

  return (
    <FormLayout className={styles.whitePanel}>
      <Heading>Login</Heading>
      <FormBody onSubmit={handleSubmit(onValid)} noValidate>
        <TextFieldList>
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
            ログイン
          </button>
        </ButtonLayout>
      </FormBody>
    </FormLayout>
  );
}
