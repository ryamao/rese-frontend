import { useState } from "react";

import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { MdStar } from "react-icons/md";

export interface RatingStarsProps {
  rating?: number;
  onClick?: (rating: number) => void;
}

export function RatingStars({ rating, onClick }: RatingStarsProps) {
  const defaultValue = Math.min(Math.max(Math.floor(rating ?? 0), 0), 5);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  return (
    <div onMouseLeave={() => setHoverValue(null)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={
            (selectedValue && index < selectedValue) ||
            (hoverValue && index < hoverValue)
              ? starStyle
              : grayStarStyle
          }
          onMouseMove={() => rating === undefined && setHoverValue(index + 1)}
          onClick={() => {
            if (rating === undefined) {
              setSelectedValue(index + 1);
              onClick?.(index + 1);
            }
          }}
        />
      ))}
    </div>
  );
}

const Star = styled(MdStar)`
  font-size: 1.5rem;
  cursor: pointer;
`;

const starStyle = css`
  color: #f9a825;
`;

const grayStarStyle = css`
  color: #ccc;
`;
