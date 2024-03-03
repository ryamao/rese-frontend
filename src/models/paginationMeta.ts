/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * Rese
 * Rese API
 * OpenAPI spec version: 0.0.1
 */
import type { PaginationMetaFrom } from "./paginationMetaFrom";
import type { PaginationMetaLinksItem } from "./paginationMetaLinksItem";
import type { PaginationMetaTo } from "./paginationMetaTo";

/**
 * ページネーションメタ情報
 */
export type PaginationMeta = {
  /** 現在のページ番号 */
  current_page: number;
  /** 現在のページの最初のレコード番号 */
  from: PaginationMetaFrom;
  /** 最終ページ番号 */
  last_page: number;
  /** ページネーションリンク */
  links: PaginationMetaLinksItem[];
  /** 現在のページのURL */
  path: string;
  /** 1ページあたりの件数 */
  per_page: number;
  /** 現在のページの最後のレコード番号 */
  to: PaginationMetaTo;
  /** 総件数 */
  total: number;
};