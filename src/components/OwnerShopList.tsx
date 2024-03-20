import styled from "@emotion/styled";

import { blueButton, whitePanel } from "./styles";
import { ShopData } from "../models";

export function OwnerShopList() {
  return (
    <Panel className={whitePanel}>
      <Table>
        <thead>
          <tr>
            <TableHeader>店舗名</TableHeader>
            <TableHeader>エリア</TableHeader>
            <TableHeader>ジャンル</TableHeader>
            <TableHeader>詳細</TableHeader>
            <TableHeader>
              <button type="button" className={blueButton}>
                店舗作成
              </button>
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {sampleShops.map((shop) => (
            <DataRow key={shop.id}>
              <TableData>{shop.name}</TableData>
              <TableData>{shop.area.name}</TableData>
              <TableData>{shop.genre.name}</TableData>
              <TableData>{shop.detail}</TableData>
              <TableData>
                <ButtonLayout>
                  <button type="button" className={blueButton}>
                    店舗更新
                  </button>
                  <button type="button" className={blueButton}>
                    予約確認
                  </button>
                </ButtonLayout>
              </TableData>
            </DataRow>
          ))}
        </tbody>
      </Table>
    </Panel>
  );
}

const Panel = styled.div`
  padding: 1rem 2rem 0.5rem;
`;

const Table = styled.table`
  width: 100%;
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
  padding: 0.5rem;
`;

const ButtonLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const sampleShops: ShopData[] = [
  {
    id: 1,
    name: "Shop 1",
    detail: "Detail 1",
    image_url: "https://dummyimage.com/300",
    area: {
      id: 1,
      name: "Area 1"
    },
    genre: {
      id: 1,
      name: "Genre 1"
    },
    favorite_status: "unknown"
  },
  {
    id: 2,
    name: "Shop 2",
    detail: "Detail 2",
    image_url: "https://dummyimage.com/300",
    area: {
      id: 2,
      name: "Area 2"
    },
    genre: {
      id: 2,
      name: "Genre 2"
    },
    favorite_status: "unknown"
  },
  {
    id: 3,
    name: "Shop 3",
    detail: "Detail 3",
    image_url: "https://dummyimage.com/300",
    area: {
      id: 3,
      name: "Area 3"
    },
    genre: {
      id: 3,
      name: "Genre 3"
    },
    favorite_status: "unknown"
  }
];
