/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * Rese
 * Rese API
 * OpenAPI spec version: 0.0.1
 */
import type { GetShops200ResponseAllOfDataItemArea } from "./getShops200ResponseAllOfDataItemArea";
import type { GetShops200ResponseAllOfDataItemFavoriteStatus } from "./getShops200ResponseAllOfDataItemFavoriteStatus";
import type { GetShops200ResponseAllOfDataItemGenre } from "./getShops200ResponseAllOfDataItemGenre";

export type GetShops200ResponseAllOfDataItem = {
  area: GetShops200ResponseAllOfDataItemArea;
  favorite_status: GetShops200ResponseAllOfDataItemFavoriteStatus;
  genre: GetShops200ResponseAllOfDataItemGenre;
  id: number;
  image_url: string;
  name: string;
};
