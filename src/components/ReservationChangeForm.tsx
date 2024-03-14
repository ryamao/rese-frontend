import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";

import { ReservationDateField } from "./ReservationDateField";
import { ReservationNumberField } from "./ReservationNumberField";
import { ReservationTimeField } from "./ReservationTimeField";
import { ReservationData } from "../models";
import { ReservationForm } from "../types";

export interface ReservationChangeFormProps {
  reservation: ReservationData;
  onSubmit: (data: ReservationData) => void;
}

export function ReservationChangeForm({
  reservation,
  onSubmit
}: ReservationChangeFormProps) {
  const defaultDateTime = dayjs(reservation.reserved_at);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<ReservationForm>({
    defaultValues: {
      date: defaultDateTime.format("YYYY-MM-DD"),
      time: defaultDateTime.format("HH:mm"),
      number: reservation.number_of_guests.toString()
    }
  });

  function onValid(data: ReservationForm) {
    const reservedAt = dayjs(`${data.date}T${data.time}`);
    const numberOfGuests = parseInt(data.number, 10);

    if (reservedAt.isBefore(dayjs())) {
      setError("date", {
        type: "manual",
        message: "過去の日時は指定できません"
      });
      return;
    }

    onSubmit({
      ...reservation,
      reserved_at: reservedAt.format(),
      number_of_guests: numberOfGuests
    });
  }

  return (
    <Form onSubmit={handleSubmit(onValid)} noValidate>
      <Inner>
        <Title>{reservation.shop.name}</Title>
        <InputList>
          <InputItem>
            <DateWrapper>
              <ReservationDateField register={register} />
            </DateWrapper>
            {errors.date && (
              <ErrorMessage>⚠ {errors.date.message}</ErrorMessage>
            )}
          </InputItem>
          <InputItem>
            <ReservationTimeField register={register} />
          </InputItem>
          <InputItem>
            <ReservationNumberField register={register} />
          </InputItem>
        </InputList>
      </Inner>
      <Submit type="submit">予約を更新する</Submit>
    </Form>
  );
}

const Form = styled.form`
  width: 24rem;
  background-color: #315dff;
  border-radius: 0.25rem;
  box-shadow: 0.125rem 0.125rem 0.25rem #888;
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
  margin: 0;
  list-style: none;
`;

const InputItem = styled.li`
  margin-top: 1.5rem;
`;

const DateWrapper = styled.div`
  width: 50%;
`;

const ErrorMessage = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #fde047;
`;

const Submit = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
  background-color: #0538ff;
  border: none;
  border-radius: 0 0 0.25rem 0.25rem;
`;
