import styled from "@emotion/styled";
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "react-hook-form";

import { ReservationCard } from "./ReservationCard";
import { ReservationDateField } from "./ReservationDateField";
import { ReservationNumberField } from "./ReservationNumberField";
import { ReservationTimeField } from "./ReservationTimeField";
import { ReservationData } from "../models";
import { ReservationForm } from "../types";

export interface ShopReservationAreaProps {
  reservations: ReservationData[];
  onSubmit?: (reservedAt: Dayjs, numberOfGuests: number) => void;
}

export function ShopReservationArea({
  reservations,
  onSubmit
}: ShopReservationAreaProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ReservationForm>();

  function onValid(data: ReservationForm) {
    const reservedAt = dayjs(`${data.date}T${data.time}`);
    const numberOfGuests = parseInt(data.number, 10);
    onSubmit?.(reservedAt, numberOfGuests);
  }

  return (
    <Form onSubmit={handleSubmit(onValid, console.log)}>
      <Inner>
        <Title>予約</Title>
        <InputList>
          <li>
            <DateItem>
              <DateField>
                <ReservationDateField register={register} />
              </DateField>
              {errors.date && (
                <ErrorMessage>⚠ {errors.date.message}</ErrorMessage>
              )}
            </DateItem>
          </li>
          <li>
            <ReservationTimeField register={register} />
          </li>
          <div>
            <ReservationNumberField register={register} />
          </div>
        </InputList>
        <ReservationList>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <ReservationCard reservation={reservation} />
            </li>
          ))}
        </ReservationList>
      </Inner>
      <Submit type="submit">予約する</Submit>
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
  background-color: #315dff;
  border-radius: 0.25rem;
`;

const Inner = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  margin: 0;
  color: #fff;
`;

const InputList = styled.ul`
  padding: 0;
  margin: 1.5rem 0;
  list-style: none;

  & > * + * {
    margin-top: 1rem;
  }
`;

const DateItem = styled.div`
  display: flex;
  align-items: center;
`;

const DateField = styled.div`
  width: 10rem;
`;

const ErrorMessage = styled.p`
  margin: 0 0 0 2rem;
  font-size: 0.875rem;
  color: #fde047;
`;

const ReservationList = styled.ul`
  padding: 0;
  list-style: none;

  & > * + * {
    margin-top: 1rem;
  }
`;

const Submit = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #0538ff;
  border: none;
  border-radius: 0 0 0.25rem 0.25rem;
`;
