import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { AuthTextField } from "./AuthTextField";
import * as styles from "./styles";
import { getCookieValue } from "../utils";

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

export interface RegisterFormProps {
  onRegister?: () => void;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export interface RegisterFormErrors {
  message: string;
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
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

async function fetchCsrfToken(): Promise<string | null> {
  const response = await fetch(
    new URL("/sanctum/csrf-cookie", import.meta.env.VITE_API_URL),
    {
      credentials: "include"
    }
  );

  if (response.ok) {
    return getCookieValue("XSRF-TOKEN");
  } else {
    return null;
  }
}

function registerUser(
  data: RegisterFormValues,
  csrfToken: string
): Promise<Response> {
  return fetch(new URL("/auth/register", import.meta.env.VITE_API_URL), {
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

export function RegisterForm({ onRegister }: RegisterFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema)
  });

  const onValid: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      const csrfToken = await fetchCsrfToken();
      if (csrfToken === null) {
        alert("TODO: CSRFトークンの取得に失敗した場合の処理を追加する");
        return;
      }

      const response = await registerUser(data, csrfToken);

      if (response.ok) {
        onRegister?.();
      } else {
        const error = (await response.json()) as RegisterFormErrors;
        setError("email", {
          type: "manual",
          message: error.message
        });
      }
    } catch (error) {
      alert("TODO: エラーが発生した場合の処理を追加する");
      console.error(error);
    }
  };

  return (
    <FormLayout className={styles.whitePanel}>
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
    </FormLayout>
  );
}
