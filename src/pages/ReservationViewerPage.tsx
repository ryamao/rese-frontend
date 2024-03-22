import styled from "@emotion/styled";
import { Location, Navigate, useLocation, useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { BackButton } from "../components/BackButton";
import { whitePanel } from "../components/styles";
import { OwnerShopData } from "../models";

export function ReservationViewerPage() {
  const { state: shop } = useLocation() as Location<OwnerShopData | null>;
  const navigate = useNavigate();

  if (!shop) {
    return <Navigate to="/owner" />;
  }

  function handleGoBack() {
    navigate(-1);
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
                <TableHeader>顧客名</TableHeader>
                <TableHeader>日付</TableHeader>
                <TableHeader>時刻</TableHeader>
                <TableHeader>人数</TableHeader>
              </tr>
            </thead>
            <tbody>
              <DataRow>
                <TableData>山田太郎</TableData>
                <TableData>2021/08/01</TableData>
                <TableData>12:00</TableData>
                <TableData>3</TableData>
              </DataRow>
              <DataRow>
                <TableData>山田太郎</TableData>
                <TableData>2021/08/01</TableData>
                <TableData>12:00</TableData>
                <TableData>3</TableData>
              </DataRow>
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
