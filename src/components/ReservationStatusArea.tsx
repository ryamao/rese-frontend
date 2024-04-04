import styled from "@emotion/styled";

import { ReservationStatusCard } from "./ReservationStatusCard";
import { ReservationData } from "../models";

export interface ReservationStatusAreaProps {
  reservations: ReservationData[];
  onClickCard?: (reservation: ReservationData) => void;
  onRemove?: (reservation: ReservationData) => void;
}

export function ReservationStatusArea({
  reservations,
  onClickCard,
  onRemove
}: ReservationStatusAreaProps) {
  const unpaidReservations = reservations.filter(
    (r) => !r.billing || !r.billing.is_paid
  );

  return (
    <div>
      <Heading>予約状況</Heading>
      <List>
        {unpaidReservations.map((reservation, index) => (
          <li key={reservation.id}>
            <ReservationStatusCard
              title={`予約${index + 1}`}
              reservation={reservation}
              onClick={onClickCard}
              onRemove={onRemove}
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
    margin-top: 2rem;
  }
`;
