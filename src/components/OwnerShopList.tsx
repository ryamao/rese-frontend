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
              <ButtonLayout>
                <Button
                  type="button"
                  className={blueButton}
                  onClick={onCreateShop}
                >
                  <MdOutlinePlaylistAdd className={addShopIconStyle} />
                  <ButtonText>店舗作成</ButtonText>
                </Button>
              </ButtonLayout>
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          <ControlRow>
            <TableData>
              <Button
                type="button"
                className={blueButton}
                onClick={onCreateShop}
              >
                <MdOutlinePlaylistAdd className={addShopIconStyle} />
                <ButtonText>店舗作成</ButtonText>
              </Button>
            </TableData>
          </ControlRow>
          {shops.map((shop) => (
            <DataRow key={shop.id}>
              <TableData data-label="店舗名">{shop.name}</TableData>
              <TableData data-label="エリア">{shop.area.name}</TableData>
              <TableData data-label="ジャンル">{shop.genre.name}</TableData>
              <TableData data-label="詳細">
                <Detail>{shop.detail}</Detail>
              </TableData>
              <TableData data-label="操作">
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
    margin-bottom: 0.5rem;
  }
`;

const DataRow = styled.tr`
  text-align: center;
  border-top: 1px solid #ccc;

  @media (width <= 768px) {
    text-align: left;
  }
`;

const TableData = styled.td`
  min-width: 6rem;
  padding: 0.5rem;

  @media (width <= 768px) {
    display: inline-block;

    &::before {
      display: block;
      font-size: 0.75rem;
      font-weight: bold;
      text-align: left;
      content: attr(data-label);
    }
  }
`;

const Detail = styled.p`
  display: -webkit-box;
  margin: 0;
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

  @media (width <= 768px) {
    flex-direction: row;
    gap: 0.25rem;
  }
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
