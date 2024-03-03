/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * Rese
 * Rese API
 * OpenAPI spec version: 0.0.1
 */
import type { AreaQueryParameter } from "./areaQueryParameter";
import type { GenreQueryParameter } from "./genreQueryParameter";
import type { PageQueryParameter } from "./pageQueryParameter";
import type { SearchQueryParameter } from "./searchQueryParameter";

export type GetShopsParams = {
  /**
   * エリアID
   */
  area?: AreaQueryParameter;
  /**
   * ジャンルID
   */
  genre?: GenreQueryParameter;
  /**
   * 店名検索キーワード
   */
  search?: SearchQueryParameter;
  /**
   * ページ番号
   */
  page?: PageQueryParameter;
};