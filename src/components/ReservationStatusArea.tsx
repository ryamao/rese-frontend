import styled from "@emotion/styled";

import { ReservationStatusCard } from "./ReservationStatusCard";
import { ReservationData } from "../models";

export interface ReservationStatusAreaProps {
  reservations: ReservationData[];
}

export function ReservationStatusArea({
  reservations
}: ReservationStatusAreaProps) {
  return (
    <div>
      <Heading>予約状況</Heading>
      <List>
        {reservations.map((reservation, index) => (
          <li key={reservation.id}>
            <ReservationStatusCard
              title={`予約${index + 1}`}
              reservation={reservation}
            />
          </li>
        ))}
      </List>
    </div>
  );
}

const Heading = styled.h2`
  margin: 1.5rem 0.125rem;
`;

const List = styled.ul`
  padding: 0;
  list-style: none;

  & > * + * {
    margin-top: 1rem;
  }
`;
