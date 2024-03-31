import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Location, Navigate, Outlet, useLocation } from "react-router-dom";

import { ReservationData } from "../models";

export function StripeElementsRoute() {
  const { state: reservation } = useLocation() as Location<
    ReservationData | undefined
  >;

  if (!reservation || !reservation.billing || reservation.billing.is_paid) {
    return <Navigate to="/mypage" replace={true} />;
  }

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  const stripeOptions: StripeElementsOptions = {
    mode: "payment",
    amount: reservation.billing.amount,
    currency: "jpy",
    paymentMethodCreation: "manual"
  };

  return (
    <>
      <Elements stripe={stripePromise} options={stripeOptions}>
        <Outlet />
      </Elements>
    </>
  );
}
