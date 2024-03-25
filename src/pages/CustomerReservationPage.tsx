import { useState } from "react";

import styled from "@emotion/styled";
import { useQueryClient } from "@tanstack/react-query";
import { QRCodeSVG } from "qrcode.react";
import { Location, Navigate, useLocation, useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { BackButton } from "../components/BackButton";
import { ReservationChangeForm } from "../components/ReservationChangeForm";
import { blueButton, whitePanel } from "../components/styles";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";
import { useCheckInUrl } from "../hooks/queries";
import { ReservationData } from "../models";
import { useCustomerId } from "../routes/CustomersOnlyRoute";

export function CustomerReservationPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { customerId } = useCustomerId();
  const { state: reservation } = useLocation() as Location<
    ReservationData | undefined
  >;
  const { putReservation } = useBackendAccessContext();
  const checkInUrl = useCheckInUrl(reservation?.id);
  const [isEnlarged, setIsEnlarged] = useState(false);

  if (!reservation) {
    return <Navigate to="/mypage" replace={true} />;
  }

  if (checkInUrl.isError) {
    return <PageBase>{checkInUrl.error.message}</PageBase>;
  }
  if (checkInUrl.isPending) {
    return <PageBase>loading...</PageBase>;
  }
  if (!checkInUrl.data.success) {
    return <PageBase>{checkInUrl.data.message}</PageBase>;
  }

  async function handleUpdateReservation(data: ReservationData) {
    const yes = window.confirm(
      [
        `以下の内容で予約を更新します`,
        `予約日時：${data.reserved_at}`,
        `予約人数：${data.number_of_guests}人`
      ].join("\n")
    );
    if (yes) {
      const response = await putReservation(customerId, data);
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: ["reservations"] });
        navigate("/mypage");
      } else {
        alert(
          `予約の変更に失敗しました\n${response.status}: ${response.message}`
        );
      }
    }
  }

  return (
    <PageBase>
      <Main>
        <Heading>
          <BackButton onClick={() => navigate(-1)} />
          <Title>{reservation.shop.name}</Title>
        </Heading>
        <QRCodeSection>
          <QRCodePanel className={whitePanel}>
            <QRCodeTitle>本人確認用QRコード</QRCodeTitle>
            <QRCodeSVG value={checkInUrl.data.data} />
            <ButtonLayout>
              <button
                className={blueButton}
                onClick={() => setIsEnlarged(true)}
              >
                拡大表示
              </button>
              <button
                className={blueButton}
                onClick={() => checkInUrl.invalidate()}
              >
                QR更新
              </button>
            </ButtonLayout>
          </QRCodePanel>
        </QRCodeSection>
        <FormSection>
          <ReservationChangeForm
            onSubmit={handleUpdateReservation}
            reservation={reservation}
          />
        </FormSection>
      </Main>
      {isEnlarged && (
        <Overlay onClick={() => setIsEnlarged(false)}>
          <OverlayPanel className={whitePanel}>
            <QRCodeSVG
              value={checkInUrl.data.data}
              width="100%"
              height="100%"
            />
          </OverlayPanel>
        </Overlay>
      )}
    </PageBase>
  );
}

const Main = styled.main`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (width <= 768px) {
    grid-template-columns: 1fr;
  }
`;

const Heading = styled.div`
  display: flex;
  grid-column: 1 / 3;
  gap: 1rem;
  align-items: center;
  margin: 1rem;

  @media (width <= 768px) {
    grid-column: 1 / 2;
    margin-top: 0;
  }
`;

const Title = styled.h2`
  margin: 0;
`;

const QRCodeSection = styled.section`
  display: flex;
`;

const QRCodePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  height: fit-content;
  padding: 2rem;
  margin: 0 auto;
`;

const QRCodeTitle = styled.h3`
  margin: 0;
`;

const ButtonLayout = styled.div`
  display: flex;
  gap: 2rem;
`;

const FormSection = styled.section`
  margin: 0 auto;

  @media (width <= 768px) {
    margin-top: 1rem;
  }

  @media (width <= 480px) {
    width: 100%;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: #000;
`;

const OverlayPanel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 1rem;
  transform: translate(-50%, -50%);
`;
