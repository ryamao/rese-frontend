/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * Rese
 * Rese API
 * OpenAPI spec version: 0.0.1
 */
import type { CustomerShopData } from "./customerShopData";

/**
 * 予約情報
 */
export interface ReservationData {
  /** 予約ID */
  id: number;
  /** チェックイン済みかどうか */
  is_checked_in: boolean;
  /** 予約人数 */
  number_of_guests: number;
  /** 予約日時 */
  reserved_at: string;
  shop: CustomerShopData;
}
