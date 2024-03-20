import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

import { blueButton, whitePanel } from "./styles";
import { EndpointResponse } from "../HttpClient";
import { PostNotificationEmailBody } from "../models";

export interface NotificationEmailFormProps {
  onSubmit: (
    body: PostNotificationEmailBody
  ) => Promise<EndpointResponse<never>>;
}

export function NotificationEmailForm({
  onSubmit
}: NotificationEmailFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<PostNotificationEmailBody>();

  async function onValid(body: PostNotificationEmailBody) {
    const response = await onSubmit(body);
    if (response.success) {
      alert("メールを送信しました");
    } else if (response.message) {
      setError("title", { type: "manual", message: response.message });
    }
  }

  return (
    <div className={whitePanel}>
      <Heading>Notification Email</Heading>
      <Form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="title">Title</label>
        <div>
          <Input
            type="text"
            id="title"
            {...register("title", {
              required: "タイトルを入力してください"
            })}
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>
        <label htmlFor="body">Content</label>
        <div>
          <Textarea
            rows={10}
            id="body"
            {...register("body", {
              required: "本文を入力してください"
            })}
          />
          <ErrorMessage>{errors.body?.message}</ErrorMessage>
        </div>
        <ButtonLayout>
          <button type="submit" className={blueButton}>
            メール送信
          </button>
        </ButtonLayout>
      </Form>
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

const Form = styled.form`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  padding: 1.5rem 2rem 1.5rem 1.5rem;
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

const Textarea = styled.textarea`
  width: 100%;
  font-size: 1rem;
  resize: vertical;

  &:focus-visible {
    outline: none;
  }
`;

const ErrorMessage = styled.span`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #f03;
`;

const ButtonLayout = styled.div`
  display: flex;
  grid-column: 1 / -1;
  justify-content: flex-end;
`;
