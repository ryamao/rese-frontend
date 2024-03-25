import { css } from "@emotion/css";
import styled from "@emotion/styled";
import dayjs from "dayjs";
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
import { OwnerShopData } from "../models";
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
                <TableHeader>顧客名</TableHeader>
                <TableHeader>日付</TableHeader>
                <TableHeader>時刻</TableHeader>
                <TableHeader>人数</TableHeader>
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
              {data.map((reservation) => (
                <DataRow key={reservation.id}>
                  <TableData>
                    <CheckBox>
                      {reservation.is_checked_in ? (
                        <MdOutlineCheckBox />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank />
                      )}
                    </CheckBox>
                  </TableData>
                  <TableData>{reservation.customer_name}</TableData>
                  <TableData>
                    {dayjs(reservation.reserved_at).format("YYYY/MM/DD")}
                  </TableData>
                  <TableData>
                    {dayjs(reservation.reserved_at).format("HH:mm")}
                  </TableData>
                  <TableData>{reservation.number_of_guests}</TableData>
                  <TableData></TableData>
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
`;

const ShopName = styled.h2`
  margin: 0;
`;

const ReservationPanel = styled.div`
  padding: 0.25rem 1.5rem;
  margin: 2rem 0;
`;

const Table = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 0.5rem;
`;

const DataRow = styled.tr`
  text-align: center;
  border-top: 1px solid #ccc;
`;

const TableData = styled.td`
  min-width: 6rem;
  padding: 0.5rem;
`;

const ButtonLayout = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
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
