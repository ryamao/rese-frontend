import { useState } from "react";

import styled from "@emotion/styled";

import { RatingStars } from "./RatingStars";
import { blueButton, whitePanel } from "./styles";
import { ShopReviewData } from "../models";

export interface ShopReviewAreaProps {
  postable: boolean;
  reviews: ShopReviewData[];
  onReviewSubmit?: (rating: number, comment: string) => void;
}

export function ShopReviewArea({
  postable,
  reviews,
  onReviewSubmit
}: ShopReviewAreaProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  function handleSelectRating(rating: number) {
    setRating(rating);
    setMessage("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (rating === null) {
      setMessage("評価を選択してください");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const comment = formData.get("comment") as string;
    onReviewSubmit?.(rating, comment);
  }

  return (
    <div className={whitePanel}>
      <Heading>レビュー</Heading>
      <Contents>
        {postable && (
          <Form onSubmit={handleSubmit}>
            <div>
              <RatingStars onClick={handleSelectRating} />
              <ErrorMessage>{message}</ErrorMessage>
            </div>
            <Textarea name="comment" rows={3}></Textarea>
            <button type="submit" className={blueButton}>
              送信する
            </button>
          </Form>
        )}
        <ReviewList>
          {reviews.map((review, index) => (
            <Review key={index}>
              <h4>{review.customer_name}</h4>
              <RatingStars rating={review.rating} />
              <p>
                {review.comment.split("\n").map((line) => (
                  <>
                    {line}
                    <br />
                  </>
                ))}
              </p>
            </Review>
          ))}
        </ReviewList>
      </Contents>
    </div>
  );
}

const Heading = styled.h2`
  padding: 1rem;
  margin: 0;
  font-size: 1rem;
  font-weight: normal;
  color: #fff;
  background-color: #315dff;
  border-radius: 0.25rem 0.25rem 0 0;
`;

const Contents = styled.div`
  padding: 0 1rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 1.5rem;
  align-items: center;
  padding: 1rem;
  border-bottom: 2px solid #ccc;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  resize: vertical;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const ErrorMessage = styled.div`
  font-size: 0.75rem;
  color: red;
`;

const ReviewList = styled.ul`
  padding: 0;
  list-style: none;

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
