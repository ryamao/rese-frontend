export type AuthStatus =
  | { status: "guest" }
  | { status: "customer"; customerId: number };

export interface ReservationForm {
  date: string;
  time: string;
  number: string;
}
