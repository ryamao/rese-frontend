import { css } from "@emotion/css";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { HiOutlineCurrencyYen } from "react-icons/hi";
import { IoQrCodeOutline } from "react-icons/io5";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank
} from "react-icons/md";
import { Location, Navigate, useLocation, useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { BackButton } from "../components/BackButton";
import { blueButton, whitePanel } from "../components/styles";
import { useReservationsForOwner } from "../hooks/queries";
import { OwnerShopData, ReservationForOwner } from "../models";
import { useOwnerId } from "../routes/OwnersOnlyRoute";

export function ReservationViewerPage() {
  const { ownerId } = useOwnerId();
  const { state: shop } = useLocation() as Location<OwnerShopData | undefined>;
  const navigate = useNavigate();

  const reservations = useReservationsForOwner(ownerId, shop?.id);

  if (!shop) {
    return <Navigate to="/owner" replace={true} />;
  }

  if (reservations.isError) {
    return <PageBase>Error: {reservations.error.message}</PageBase>;
  }
  if (reservations.isPending) {
    return <PageBase>Loading...</PageBase>;
  }

  const errors = reservations.data.pages.flatMap((page) => {
    if (!page.success && page.message) {
      return { status: page.status, message: page.message };
    } else {
      return [];
    }
  });
  if (errors.length > 0) {
    return (
      <PageBase>
        {errors.map(({ status, message }, index) => (
          <p key={index}>
            {status}: {message}
          </p>
        ))}
      </PageBase>
    );
  }

  const data = reservations.data.pages.flatMap((page) => {
    if (page.success) {
      return page.data.data;
    } else {
      return [];
    }
  });

  function handleGoBack() {
    navigate(-1);
  }

  function handleCheckIn() {
    navigate(`/owner/check-in`, { state: shop });
  }

  function handleBilling(reservation: ReservationForOwner) {
    navigate(`/owner/billing`, { state: reservation });
  }

  return (
    <PageBase>
      <main>
        <Heading>
          <BackButton onClick={handleGoBack} />
          <ShopName>予約一覧：{shop.name}</ShopName>
        </Heading>
        <ReservationPanel className={whitePanel}>
          <Table>
            <thead>
              <tr>
                <TableHeader>入店</TableHeader>
                <TableHeader>決済</TableHeader>
                <TableHeader>顧客名</TableHeader>
                <TableHeader>日付</TableHeader>
                <TableHeader>時刻</TableHeader>
                <TableHeader>人数</TableHeader>
                <TableHeader>金額</TableHeader>
                <TableData>
                  <ButtonLayout>
                    <Button
                      type="button"
                      className={blueButton}
                      onClick={handleCheckIn}
                    >
                      <IoQrCodeOutline className={qrCodeIconStyle} />
                      <ButtonText>QR照合</ButtonText>
                    </Button>
                  </ButtonLayout>
                </TableData>
              </tr>
            </thead>
            <tbody>
              <ControlRow>
                <TableData>
                  <ButtonLayout>
                    <Button
                      type="button"
                      className={blueButton}
                      onClick={handleCheckIn}
                    >
                      <IoQrCodeOutline className={qrCodeIconStyle} />
                      <ButtonText>QR照合</ButtonText>
                    </Button>
                  </ButtonLayout>
                </TableData>
              </ControlRow>
              {data.map((reservation) => (
                <DataRow key={reservation.id}>
                  <TableData data-label="入店">
                    <CheckBox>
                      {reservation.is_checked_in ? (
                        <MdOutlineCheckBox />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank />
                      )}
                    </CheckBox>
                  </TableData>
                  <TableData data-label="決済">
                    <CheckBox>
                      {reservation.billing?.is_paid ? (
                        <MdOutlineCheckBox />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank />
                      )}
                    </CheckBox>
                  </TableData>
                  <TableData data-label="顧客名">
                    {reservation.customer_name}
                  </TableData>
                  <TableData data-label="日付">
                    {dayjs(reservation.reserved_at).format("YYYY/MM/DD")}
                  </TableData>
                  <TableData data-label="時刻">
                    {dayjs(reservation.reserved_at).format("HH:mm")}
                  </TableData>
                  <TableData data-label="人数">
                    {reservation.number_of_guests}
                  </TableData>
                  <TableData data-label="金額">
                    {reservation.billing?.amount ?? "-"} 円
                  </TableData>
                  <TableData data-label="操作">
                    <ButtonLayout>
                      {reservation.is_checked_in && !reservation.billing ? (
                        <Button
                          type="button"
                          className={blueButton}
                          onClick={() => handleBilling(reservation)}
                        >
                          <HiOutlineCurrencyYen
                            className={currencyYenIconStyle}
                          />
                          <ButtonText>金額登録</ButtonText>
                        </Button>
                      ) : null}
                    </ButtonLayout>
                  </TableData>
                </DataRow>
              ))}
            </tbody>
          </Table>
        </ReservationPanel>
      </main>
    </PageBase>
  );
}

const Heading = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;

  @media (width <= 768px) {
    padding: 0 1rem;
  }
`;

const ShopName = styled.h2`
  margin: 0;
`;

const ReservationPanel = styled.div`
  padding: 0.25rem 1.5rem;
  margin: 2rem 0;

  @media (width <= 480px) {
    margin: 1rem 0;
  }
`;

const Table = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;

  @media (width <= 768px) {
    & > thead {
      display: none;
    }
  }
`;

const TableHeader = styled.th`
  padding: 0.5rem;
`;

const ControlRow = styled.tr`
  display: none;

  @media (width <= 768px) {
    display: block;
    text-align: left;
  }
`;

const DataRow = styled.tr`
  text-align: center;
  border-top: 1px solid #ccc;

  @media (width <= 768px) {
    display: flex;
    flex-wrap: wrap;
    column-gap: 0.5rem;
    justify-content: space-between;
    padding: 0.5rem 0;
    text-align: left;
  }
`;

const TableData = styled.td`
  padding: 0.5rem;

  @media (width <= 768px) {
    display: inline-block;

    &:nth-of-type(even) {
      background-color: #f8f8f8;
    }

    &::before {
      display: block;
      font-size: 0.75rem;
      font-weight: bold;
      text-align: left;
      content: attr(data-label);
    }
  }
`;

const ButtonLayout = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  min-width: 6rem;
`;

const Button = styled.button`
  display: grid;
  grid-template-columns: 1.25rem 1fr;
  align-items: center;
  width: 6rem;
  padding: 0.25rem 0.5rem;
`;

const qrCodeIconStyle = css`
  font-size: 1rem;
`;

const currencyYenIconStyle = css`
  font-size: 1.125rem;
`;

const ButtonText = styled.div`
  width: 100%;
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #000;
`;
