import styled from "@emotion/styled";
import dayjs from "dayjs";

import { ReservationData } from "../models";

export interface ReservationCardProps {
  reservation: ReservationData;
}

export function ReservationCard({
  reservation: { shop, reserved_at, number_of_guests }
}: ReservationCardProps) {
  const datetime = dayjs(reserved_at);

  return (
    <Table>
      <tr>
        <Head>Shop</Head>
        <td>{shop.name}</td>
      </tr>
      <tr>
        <Head>Date</Head>
        <td>{datetime.format("YYYY-MM-DD")}</td>
      </tr>
      <tr>
        <Head>Time</Head>
        <td>{datetime.format("HH:mm")}</td>
      </tr>
      <tr>
        <Head>Number</Head>
        <td>{number_of_guests}人</td>
      </tr>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
  padding: 1.25rem;
  color: white;
  background-color: #4d7fff;
  border-radius: 0.25rem;
`;

const Head = styled.th`
  width: 7.5rem;
  padding: 0.25rem 0;
  font-weight: normal;
  text-align: left;
`;
