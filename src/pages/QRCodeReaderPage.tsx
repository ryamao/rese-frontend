import styled from "@emotion/styled";
import { useQueryClient } from "@tanstack/react-query";
import { Location, Navigate, useLocation, useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { BackButton } from "../components/BackButton";
import { QRCodeReader } from "../components/QRCodeReader";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";
import { OwnerShopData } from "../models";

export function QRCodeReaderPage() {
  const { state: shop } = useLocation() as Location<OwnerShopData | undefined>;
  const { postCheckIn } = useBackendAccessContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleGoBack() {
    navigate(-1);
  }

  async function handleReadQRCode(text: string) {
    const response = await postCheckIn(text);
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: ["reservations for owner"] });
      navigate(-1);
      alert("入店を確認しました");
    } else {
      alert(`QRコードが不正です\n${response.status}: ${response.message}`);
    }
  }

  if (!shop) {
    return <Navigate to="/owner" replace={true} />;
  }

  return (
    <PageBase>
      <Heading>
        <BackButton onClick={handleGoBack} />
        <ShopName>入店確認：{shop.name}</ShopName>
      </Heading>
      <main>
        <Wrapper>
          <QRCodeReader onRead={handleReadQRCode} />
        </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  @media (width <= 768px) {
    margin: 0;
  }
`;
