import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AuthTextField } from "./AuthTextField";
import { blueButton, whitePanel } from "./styles";
import { EndpointResponse } from "../HttpClient";
import { PostOwnersBody } from "../models";

export interface CreateOwnerFormProps {
  onSubmit: (body: PostOwnersBody) => Promise<EndpointResponse<never>>;
}

export function CreateOwnerForm({ onSubmit }: CreateOwnerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<PostOwnersBody>({
    resolver: zodResolver(registerFormSchema)
  });

  async function onValid(body: PostOwnersBody) {
    const response = await onSubmit(body);
    if (response.success) {
      alert("アカウントを作成しました");
    } else if (response.message) {
      setError("email", { message: response.message });
    }
  }

  return (
    <FormWrapper className={whitePanel}>
      <Heading>Owner Registration</Heading>
      <Form onSubmit={handleSubmit(onValid)} noValidate>
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
          <button type="submit" className={blueButton}>
            アカウント作成
          </button>
        </ButtonLayout>
      </Form>
    </FormWrapper>
  );
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
  justify-content: flex-end;
  margin-top: 0.5rem;
`;
