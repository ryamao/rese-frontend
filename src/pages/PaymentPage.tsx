import { useState } from "react";

import styled from "@emotion/styled";
import {
  PaymentElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { useQueryClient } from "@tanstack/react-query";
import { Location, Navigate, useLocation, useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { blueButton, whitePanel } from "../components/styles";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";
import { ReservationData } from "../models";

export function PaymentPage() {
  const stripe = useStripe();
  const elements = useElements();
  const { state: reservation } = useLocation() as Location<
    ReservationData | undefined
  >;
  const { postPayment } = useBackendAccessContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!reservation || reservation.billing?.is_paid) {
    return <Navigate to="/mypage" replace={true} />;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setLoading(false);
      alert(submitError.message);
      return;
    }

    const { error: confirmError, confirmationToken } =
      await stripe.createConfirmationToken({
        elements
      });
    if (confirmError) {
      setLoading(false);
      alert(confirmError.message);
    }

    const response = await postPayment(reservation!.id, {
      confirmation_token_id: confirmationToken!.id
    });
    if (response.success) {
      alert("支払いが完了しました");
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      navigate("/mypage", { replace: true });
    } else {
      alert(`支払いに失敗しました\n${response.status}: ${response.message}`);
    }
  }

  return (
    <PageBase>
      <Heading>
        <Title>支払い：{reservation.shop.name}</Title>
      </Heading>
      <main>
        <Panel className={whitePanel}>
          <FormTitle>Payment</FormTitle>
          <Form onSubmit={handleSubmit}>
            <Table>
              <tbody>
                <tr>
                  <th>内容</th>
                  <td>{reservation.billing?.description}</td>
                </tr>
                <tr>
                  <th>金額</th>
                  <td>{reservation.billing?.amount}円</td>
                </tr>
              </tbody>
            </Table>
            <PaymentElement />
            <ButtonLayout>
              <button
                type="submit"
                className={blueButton}
                disabled={!stripe || loading}
              >
                決済する
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
  align-items: center;
  padding: 1rem;

  @media (width <= 768px) {
    padding: 0 1rem;
  }
`;

const Title = styled.h2`
  margin: 0;
`;

const Panel = styled.div`
  max-width: 30rem;
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
  gap: 1.5rem;
  padding: 2rem;
`;

const Table = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;
`;

const ButtonLayout = styled.div`
  display: flex;
  grid-column: 1 / -1;
  gap: 1.5rem;
  justify-content: flex-end;
`;
