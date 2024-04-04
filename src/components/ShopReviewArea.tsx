import styled from "@emotion/styled";

import { RatingStars } from "./RatingStars";
import { blueButton, whitePanel } from "./styles";
import { ShopReviewData } from "../models";

export interface ShopReviewAreaProps {
  reviews: ShopReviewData[];
}

export function ShopReviewArea({ reviews }: ShopReviewAreaProps) {
  function handleSelectRating(rating: number) {
    alert(`Rating selected: ${rating}`);
  }

  return (
    <Panel className={whitePanel}>
      <Form>
        <RatingStars onClick={handleSelectRating} />
        <Textarea rows={3}></Textarea>
        <button type="submit" className={blueButton}>
          送信する
        </button>
      </Form>
      <ReviewList>
        {reviews.map((review, index) => (
          <Review key={index}>
            <h4>{review.customer_name}</h4>
            <RatingStars rating={review.rating} />
            <p>{review.comment}</p>
          </Review>
        ))}
      </ReviewList>
    </Panel>
  );
}

const Panel = styled.div`
  padding: 1rem 1rem 0;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 1.5rem;
  align-items: center;
  padding: 0 1rem;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  resize: vertical;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const ReviewList = styled.ul`
  padding: 0;
  list-style: none;
  border-top: 2px solid #ccc;

  & > * + * {
    border-top: 1px solid #ccc;
  }
`;

const Review = styled.li`
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 1.5rem;
  align-items: center;
  padding-left: 1rem;
`;
