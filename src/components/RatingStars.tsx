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
  const [value, setValue] = useState(defaultValue);

  return (
    <div onMouseLeave={() => setValue(defaultValue)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={index < value ? starStyle : grayStarStyle}
          onMouseMove={() => setValue(index + 1)}
          onClick={() => onClick?.(index + 1)}
        />
      ))}
    </div>
  );
}

const Star = styled(MdStar)`
  font-size: 2rem;
  cursor: pointer;
`;

const starStyle = css`
  color: #f9a825;
`;

const grayStarStyle = css`
  color: #ccc;
`;
