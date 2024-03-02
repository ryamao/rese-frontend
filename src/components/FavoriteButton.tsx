import { css } from "@emotion/css";
import { FaHeart } from "react-icons/fa";

export interface FavoriteButtonProps {
  isFavorite: boolean;
}

export function FavoriteButton({ isFavorite }: FavoriteButtonProps) {
  return <FaHeart className={isFavorite ? favoriteStyle : notFavoriteStyle} />;
}

const favoriteStyle = css`
  width: 2rem;
  height: 2rem;
  color: #f00;
`;

const notFavoriteStyle = css`
  width: 2rem;
  height: 2rem;
  color: #eee;
`;
