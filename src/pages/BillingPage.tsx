import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Location, Navigate, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

import { PageBase } from "./PageBase";
import { BackButton } from "../components/BackButton";
import { blueButton, whitePanel } from "../components/styles";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";
import { PostReservationBillingBody, ReservationForOwner } from "../models";

export function BillingPage() {
  const navigate = useNavigate();
  const { state: reservation } = useLocation() as Location<
    ReservationForOwner | undefined
  >;
  const { postBilling } = useBackendAccessContext();
  const queryClient = useQueryClient();

  const schema = z.object({
    description: z
      .string()
      .min(1, "請求内容を入力してください")
      .max(255, "請求内容は255文字以内で入力してください"),
    amount: z.number().positive().int()
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PostReservationBillingBody>({
    defaultValues: {
      amount: reservation?.billing?.amount,
      description: reservation?.billing?.description
    },
    resolver: zodResolver(schema)
  });

  function handleGoBack() {
    navigate(-1);
  }

  async function onValid(data: PostReservationBillingBody) {
    const response = await postBilling(reservation!.id, data);
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: ["reservations for owner"] });
      navigate(-1);
      alert("請求を登録しました");
    } else {
      alert(
        `請求の登録に失敗しました\n${response.status}: ${response.message}`
      );
    }
  }

  if (!reservation) {
    return <Navigate to="/owner" replace={true} />;
  }

  return (
    <PageBase>
      <Heading>
        <BackButton onClick={handleGoBack} />
        <Title>請求登録：{reservation.customer_name}</Title>
      </Heading>
      <main>
        <Panel className={whitePanel}>
          <FormTitle>Billing</FormTitle>
          <Form onSubmit={handleSubmit(onValid)}>
            <FormItem>
              <label htmlFor="description">請求内容</label>
              <InputWrapper>
                <Input
                  type="text"
                  id="description"
                  {...register("description")}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
              </InputWrapper>
            </FormItem>
            <FormItem>
              <label htmlFor="amount">請求金額</label>
              <InputWrapper>
                <Input
                  type="number"
                  id="amount"
                  {...register("amount", { valueAsNumber: true })}
                />
                <ErrorMessage>{errors.amount?.message}</ErrorMessage>
              </InputWrapper>
            </FormItem>
            <ButtonLayout>
              <button type="submit" className={blueButton}>
                請求する
              </button>
            </ButtonLayout>
          </Form>
        </Panel>
      </main>
    </PageBase>
  );
}

const Heading = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
`;

const Title = styled.h2`
  margin: 0;
`;

const Panel = styled.div`
  width: 24rem;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
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
  gap: 1.5rem 1rem;
  padding: 2rem;
`;

const FormItem = styled.div`
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  align-items: baseline;
`;

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
`;

const ErrorMessage = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: red;
`;

const Input = styled.input`
  padding: 0.25rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const ButtonLayout = styled.div`
  display: flex;
  grid-column: 1 / -1;
  gap: 1.5rem;
  justify-content: flex-end;
`;
