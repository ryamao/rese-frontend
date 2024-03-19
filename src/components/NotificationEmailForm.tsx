import styled from "@emotion/styled";

import { blueButton, whitePanel } from "./styles";

export function NotificationEmailForm() {
  return (
    <div className={whitePanel}>
      <Heading>Notification Email</Heading>
      <Form>
        <label htmlFor="title">Title</label>
        <Input type="text" id="title" name="title" />
        <label htmlFor="message">Message</label>
        <Textarea rows={5} id="message" name="message" />
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
  padding: 1.5rem 2rem 1.5rem 1.5rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0 0.125rem;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 1rem;

  &:focus-visible {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  resize: vertical;
  font-size: 1rem;

  &:focus-visible {
    outline: none;
  }
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-column: 1 / -1;
`;
