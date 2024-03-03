import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { FaHeart } from "react-icons/fa";

type FavoriteStatus = "unknown" | "marked" | "unmarked";

export interface FavoriteButtonProps {
  favoriteStatus: FavoriteStatus;
  onClick?: (status: FavoriteStatus) => void;
}

export function FavoriteButton({
  favoriteStatus,
  onClick
}: FavoriteButtonProps) {
  return (
    <Button
      type="button"
      aria-label={getLabel(favoriteStatus)}
      onClick={() => onClick?.(favoriteStatus)}
    >
      <FaHeart className={getStyle(favoriteStatus)} />
    </Button>
  );
}

function getLabel(favoriteStatus: FavoriteStatus) {
  switch (favoriteStatus) {
    case "unknown":
      return "お気に入り";
    case "marked":
      return "お気に入り解除";
    case "unmarked":
      return "お気に入り登録";
  }
}

function getStyle(favoriteStatus: FavoriteStatus) {
  switch (favoriteStatus) {
    case "unknown":
      return notFavoriteStyle;
    case "marked":
      return favoriteStyle;
    case "unmarked":
      return notFavoriteStyle;
  }
}

const Button = styled.button`
  width: 2rem;
  height: 2rem;
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
`;

const favoriteStyle = css`
  width: 100%;
  height: 100%;
  color: #f00;
`;

const notFavoriteStyle = css`
  width: 100%;
  height: 100%;
  color: #eee;
`;
