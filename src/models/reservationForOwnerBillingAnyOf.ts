/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * Rese
 * Rese API
 * OpenAPI spec version: 0.0.1
 */

/**
 * 請求情報
 */
export type ReservationForOwnerBillingAnyOf = {
  /** 請求金額 */
  amount?: number;
  /** 請求内容 */
  description?: string;
  /** 支払い済みかどうか */
  is_paid?: boolean;
};
