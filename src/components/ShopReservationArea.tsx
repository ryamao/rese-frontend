import styled from "@emotion/styled";

import { ReservationCard } from "./ReservationCard";
import { ReservationDateField } from "./ReservationDateField";
import { ReservationNumberField } from "./ReservationNumberField";
import { ReservationTimeField } from "./ReservationTimeField";
import { ReservationData, ShopData } from "../models";

const sampleReservations = [
  {
    shop: {
      name: "仙人"
    } as ShopData,
    reserved_at: "2021-12-31T12:00:00+09:00",
    number_of_guests: 2
  },
  {
    shop: {
      name: "仙人"
    } as ShopData,
    reserved_at: "2021-12-31T12:00:00+09:00",
    number_of_guests: 2
  },
  {
    shop: {
      name: "仙人"
    } as ShopData,
    reserved_at: "2021-12-31T12:00:00+09:00",
    number_of_guests: 2
  }
] as ReservationData[];

export function ShopReservationArea() {
  return (
    <Form>
      <Inner>
        <Title>予約</Title>
        <InputList>
          <DateItem>
            <ReservationDateField />
          </DateItem>
          <div>
            <ReservationTimeField />
          </div>
          <div>
            <ReservationNumberField />
          </div>
        </InputList>
        <ReservationList>
          {sampleReservations.map((reservation, index) => (
            <li key={index}>
              <ReservationCard reservation={reservation} />
            </li>
          ))}
        </ReservationList>
      </Inner>
      <Submit>予約する</Submit>
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

const DateItem = styled.li`
  width: 10rem;
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
