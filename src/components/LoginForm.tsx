import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AuthTextField } from "./AuthTextField";
import * as styles from "./styles";
import { fetchCsrfToken } from "../fetch";
import { PostAuthLogin422Response, PostAuthLoginBody } from "../models";

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

function loginUser(
  data: PostAuthLoginBody,
  csrfToken: string
): Promise<Response> {
  return fetch(new URL("/auth/login", import.meta.env.VITE_API_URL), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-XSRF-TOKEN": csrfToken
    },
    body: JSON.stringify(data)
  });
}

export interface LoginFormProps {
  onLogin?: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<PostAuthLoginBody>({
    resolver: zodResolver(loginFormSchema)
  });

  async function onValid(data: PostAuthLoginBody) {
    try {
      const csrfToken = await fetchCsrfToken();
      if (csrfToken === null) {
        alert("TODO: CSRFトークンの取得に失敗した場合の処理を追加する");
        return;
      }

      const response = await loginUser(data, csrfToken);

      if (response.ok) {
        onLogin?.();
      } else {
        const error = (await response.json()) as PostAuthLogin422Response;
        setError("email", {
          type: "manual",
          message: error.message
        });
      }
    } catch (error) {
      alert("TODO: エラーが発生した場合の処理を追加する");
      console.error(error);
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
