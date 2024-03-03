/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * Rese
 * Rese API
 * OpenAPI spec version: 0.0.1
 */
import type { PaginationLinksNext } from "./paginationLinksNext";
import type { PaginationLinksPrev } from "./paginationLinksPrev";

/**
 * ページネーションリンク
 */
export type PaginationLinks = {
  /** 最初のページのURL */
  first: string;
  /** 最後のページのURL */
  last: string;
  /** 次のページのURL */
  next: PaginationLinksNext;
  /** 前のページのURL */
  prev: PaginationLinksPrev;
};