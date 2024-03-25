import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { CgList } from "react-icons/cg";
import { MdOutlineEditNote, MdOutlinePlaylistAdd } from "react-icons/md";

import { blueButton, whitePanel } from "./styles";
import { OwnerShopData } from "../models";

export interface OwnerShopListProps {
  shops: OwnerShopData[];
  onCreateShop: () => void;
  onUpdateShop: (shop: OwnerShopData) => void;
  onViewReservations: (shop: OwnerShopData) => void;
}

export function OwnerShopList({
  shops,
  onCreateShop,
  onUpdateShop,
  onViewReservations
}: OwnerShopListProps) {
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
              <Button
                type="button"
                className={blueButton}
                onClick={onCreateShop}
              >
                <MdOutlinePlaylistAdd className={addShopIconStyle} />
                <ButtonText>店舗作成</ButtonText>
              </Button>
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop) => (
            <DataRow key={shop.id}>
              <TableData>{shop.name}</TableData>
              <TableData>{shop.area.name}</TableData>
              <TableData>{shop.genre.name}</TableData>
              <TableData>
                <Detail>{shop.detail}</Detail>
              </TableData>
              <TableData>
                <ButtonLayout>
                  <Button
                    type="button"
                    className={blueButton}
                    onClick={() => onUpdateShop(shop)}
                  >
                    <MdOutlineEditNote className={editShopIconStyle} />
                    <ButtonText>店舗更新</ButtonText>
                  </Button>
                  <Button
                    type="button"
                    className={blueButton}
                    onClick={() => onViewReservations(shop)}
                  >
                    <CgList className={viewReservationsIconStyle} />
                    <ButtonText>予約確認</ButtonText>
                  </Button>
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
  min-width: 6rem;
  padding: 0.5rem;
`;

const Detail = styled.p`
  display: -webkit-box;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const ButtonLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const Button = styled.button`
  display: grid;
  grid-template-columns: 1.25rem 1fr;
  align-items: center;
  width: 6rem;
  padding: 0.25rem 0.5rem;
`;

const addShopIconStyle = css`
  font-size: 1.25rem;
`;

const editShopIconStyle = css`
  font-size: 1.25rem;
`;

const viewReservationsIconStyle = css`
  font-size: 1rem;
`;

const ButtonText = styled.div`
  width: 100%;
`;
