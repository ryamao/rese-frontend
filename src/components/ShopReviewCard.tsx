import styled from "@emotion/styled";

import { RatingStars } from "./RatingStars";
import { blueButton, whitePanel } from "./styles";
import { ShopData } from "../models";

export interface ShopReviewCardProps {
  shop: ShopData;
  onSelectRating?: (shop: ShopData, rating: number) => void;
}

export function ShopReviewCard({ shop, onSelectRating }: ShopReviewCardProps) {
  return (
    <Card className={whitePanel}>
      <h3>{shop.name}</h3>
      <RatingStars onClick={(rating) => onSelectRating?.(shop, rating)} />
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
