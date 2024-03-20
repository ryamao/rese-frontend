import React from "react";

import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { FavoriteShopsArea } from "../components/FavoriteShopsArea";
import { MenuButton } from "../components/MenuButton";
import { ReservationChangeForm } from "../components/ReservationChangeForm";
import { ReservationStatusArea } from "../components/ReservationStatusArea";
import * as queries from "../hooks/queries";
import { ReservationData, ShopData } from "../models";
import { useCustomerId } from "../routes/CustomersOnlyRoute";

export function DashboardPage() {
  const { customerId } = useCustomerId();
  const customer = queries.useCustomer(customerId);
  const reservations = queries.useReservations(customerId);
  const favorites = queries.useFavorites(customerId);
  const [selectedReservation, setSelectedReservation] =
    React.useState<ReservationData | null>(null);
  const navigate = useNavigate();

  if (customer.isError) {
    return <PageBase>Error: {customer.error.message}</PageBase>;
  }
  if (customer.isPending) {
    return <PageBase>Loading...</PageBase>;
  }

  if (reservations.isError) {
    return <PageBase>Error: {reservations.error.message}</PageBase>;
  }
  if (reservations.isPending) {
    return <PageBase>Loading...</PageBase>;
  }
  if (!reservations.data.success) {
    return (
      <PageBase>
        {reservations.data.status}: {reservations.data.message}
      </PageBase>
    );
  }

  if (favorites.isError) {
    return <PageBase>Error: {favorites.error.message}</PageBase>;
  }
  if (favorites.isPending) {
    return <PageBase>Loading...</PageBase>;
  }

  const favoriteShops = favorites.data.pages.flatMap((page) =>
    page.success ? page.data.data : []
  );

  function handleClickCard(reservation: ReservationData) {
    setSelectedReservation(reservation);
  }

  function handleReservationRemove(reservation: ReservationData) {
    const yes = window.confirm(
      [
        `以下の予約をキャンセルします`,
        `店舗名：${reservation.shop.name}`,
        `予約日時：${reservation.reserved_at}`,
        `予約人数：${reservation.number_of_guests}人`
      ].join("\n")
    );
    if (yes) {
      reservations.cancel(reservation);
    }
  }

  function handleUpdateReservation(data: ReservationData) {
    const yes = window.confirm(
      [
        `以下の内容で予約を更新します`,
        `予約日時：${data.reserved_at}`,
        `予約人数：${data.number_of_guests}人`
      ].join("\n")
    );
    if (yes) {
      reservations.update(data);
      setSelectedReservation(null);
    }
  }

  function handleClickDetailButton(shop: ShopData) {
    navigate(`/detail/${shop.id}`, { state: shop });
  }

  return (
    <>
      <PageBase>
        <Inner>
          <Name>{customer.data.name}さん</Name>
          <ReservationStatusArea
            reservations={reservations.data.data}
            onClickCard={handleClickCard}
            onRemove={handleReservationRemove}
          />
          <FavoriteShopsArea
            customerId={customerId}
            favorites={favoriteShops}
            onClickDetailButton={handleClickDetailButton}
          />
        </Inner>
      </PageBase>
      {selectedReservation && (
        <OverlayBody>
          <OverlayHeader>
            <MenuButton
              isMenuOpened
              onClick={() => setSelectedReservation(null)}
            />
          </OverlayHeader>
          <OverlayContent>
            <ReservationChangeForm
              onSubmit={handleUpdateReservation}
              reservation={selectedReservation}
            />
          </OverlayContent>
        </OverlayBody>
      )}
    </>
  );
}

const Inner = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 2fr 3fr;
  gap: 0.5rem 5rem;

  & > h2 {
    grid-row: 1 / 2;
    grid-column: 1 / 3;
  }

  & > div:nth-of-type(1) {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }

  & > div:nth-of-type(2) {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }

  @media (width <= 1024px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }

  @media (width <= 768px) {
    grid-template-rows: auto auto 1fr;
    grid-template-columns: 1fr;
    gap: 0;

    & > h2 {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }

    & > div:nth-of-type(1) {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }

    & > div:nth-of-type(2) {
      grid-row: 3 / 4;
      grid-column: 1 / 2;
    }
  }
`;

const Name = styled.h2`
  margin: 0 auto;
  font-size: 1.75rem;
`;

const OverlayBody = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const OverlayHeader = styled.div`
  width: 100%;
  max-width: 1230px;
  padding: 2rem;
  margin: 0 auto;
`;

const OverlayContent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
