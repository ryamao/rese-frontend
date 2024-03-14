import styled from "@emotion/styled";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { ReservationRemovalButton } from "./ReservationRemovalButton";
import { ReservationStatusIcon } from "./ReservationStatusIcon";
import { ReservationData } from "../models";

dayjs.extend(utc);
dayjs.extend(timezone);

export interface ReservationStatusCardProps {
  title: string;
  reservation: ReservationData;
  onClick?: (reservation: ReservationData) => void;
  onRemove?: (reservation: ReservationData) => void;
}

export function ReservationStatusCard({
  title,
  reservation,
  onClick,
  onRemove
}: ReservationStatusCardProps) {
  const reservedAt = dayjs(reservation.reserved_at).tz("Asia/Tokyo");

  function handleClick() {
    onClick?.(reservation);
  }

  function handleRemove() {
    onRemove?.(reservation);
  }

  return (
    <Card onClick={handleClick}>
      <TitleLayout>
        <TitleWithIcon>
          <IconWrapper>
            <ReservationStatusIcon
              hour={reservedAt.hour()}
              minute={reservedAt.minute()}
            />
          </IconWrapper>
          <Title>{title}</Title>
        </TitleWithIcon>
        <RemovalButtonWrapper>
          <ReservationRemovalButton onClick={handleRemove} />
        </RemovalButtonWrapper>
      </TitleLayout>
      <table>
        <tbody>
          <tr>
            <TableHeader>Shop</TableHeader>
            <td>{reservation.shop.name}</td>
          </tr>
          <tr>
            <TableHeader>Date</TableHeader>
            <td>{reservedAt.format("YYYY-MM-DD")}</td>
          </tr>
          <tr>
            <TableHeader>Time</TableHeader>
            <td>{reservedAt.format("HH:mm")}</td>
          </tr>
          <tr>
            <TableHeader>Number</TableHeader>
            <td>{reservation.number_of_guests}人</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}

const Card = styled.div`
  padding: 2rem;
  color: #fff;
  cursor: pointer;
  background-color: #315dff;
  border-radius: 0.25rem;
  box-shadow: 0.125rem 0.125rem 0.25rem #888;
`;

const TitleLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const TitleWithIcon = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: normal;
`;

const RemovalButtonWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
`;

const TableHeader = styled.th`
  padding: 0.5rem 0;
  padding-right: 3rem;
  text-align: left;
`;
