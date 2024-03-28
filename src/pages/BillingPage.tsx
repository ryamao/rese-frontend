import styled from "@emotion/styled";
import { Location, Navigate, useLocation, useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { BackButton } from "../components/BackButton";
import { blueButton, whitePanel } from "../components/styles";
import { ReservationForOwner } from "../models";

export function BillingPage() {
  const navigate = useNavigate();
  const { state: reservation } = useLocation() as Location<
    ReservationForOwner | undefined
  >;

  function handleGoBack() {
    navigate(-1);
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
          <Form>
            <FormItem>
              <label htmlFor="bill">請求金額</label>
              <InputWrapper>
                <Input type="number" id="bill" />
                <ErrorMessage></ErrorMessage>
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
