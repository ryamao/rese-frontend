import styled from "@emotion/styled";
import dayjs from "dayjs";

import { RatingStars } from "./RatingStars";
import { blueButton, whitePanel } from "./styles";
import { ReservationData } from "../models";

export interface ShopReviewCardProps {
  reservation: ReservationData;
}

export function ShopReviewCard({ reservation }: ShopReviewCardProps) {
  return (
    <Card className={whitePanel}>
      <h3>
        {reservation.shop.name} (
        {dayjs(reservation.reserved_at).format("YYYY/MM/DD HH:mm")})
      </h3>
      <RatingStars />
      <Form>
        <Textarea rows={5}></Textarea>
        <ButtonLayout>
          <button type="submit" className={blueButton}>
            送信する
          </button>
        </ButtonLayout>
      </Form>
    </Card>
  );
}

const Card = styled.div`
  padding: 1rem;
`;

const Form = styled.form`
  margin-top: 1rem;
`;

const Textarea = styled.textarea`
  width: calc(100% - 1rem);
  padding: 0.5rem;
  resize: vertical;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;
