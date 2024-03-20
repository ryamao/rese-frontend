import styled from "@emotion/styled";

import { PageBase } from "./PageBase";
import { blueButton, whitePanel } from "../components/styles";

export function OwnerShopPage() {
  return (
    <PageBase>
      <Main>
        <section>
          <div className={whitePanel}>
            <FormTitle>New Shop</FormTitle>
            <Form>
              <FormItem>
                <label htmlFor="name">店舗名</label>
                <Input type="text" id="name" />
              </FormItem>
              <FormItem>
                <label htmlFor="area">エリア</label>
                <Select id="area">
                  <option defaultChecked>All area</option>
                  <option value="1">東京都</option>
                  <option value="2">大阪府</option>
                  <option value="3">福岡県</option>
                </Select>
              </FormItem>
              <FormItem>
                <label htmlFor="genre">ジャンル</label>
                <Select id="genre">
                  <option defaultChecked>All genre</option>
                  <option value="1">寿司</option>
                  <option value="2">焼肉</option>
                  <option value="3">居酒屋</option>
                  <option value="4">イタリアン</option>
                  <option value="5">ラーメン</option>
                </Select>
              </FormItem>
              <FormItem>
                <label htmlFor="detail">詳細</label>
                <Textarea id="detail" rows={10}></Textarea>
              </FormItem>
              <ButtonLayout>
                <button type="submit" className={blueButton}>
                  作成
                </button>
              </ButtonLayout>
            </Form>
          </div>
        </section>
        <section>
          <ShopName>店舗名</ShopName>
          <ShopImage>
            <img src="https://via.placeholder.com/400x300" alt="店舗名" />
          </ShopImage>
          <ShopTags>
            <span>#東京都</span>
            <span>#寿司</span>
          </ShopTags>
          <ShopDetail>サンプルテキスト</ShopDetail>
        </section>
      </Main>
    </PageBase>
  );
}

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;

  @media (width <= 1024px) {
    grid-template-columns: 1fr;
  }
`;

const FormTitle = styled.h2`
  padding: 1rem;
  margin: 0;
  font-size: 1rem;
  font-weight: normal;
  color: #fff;
  background-color: #315dff;
  border-radius: 0.25rem 0.25rem 0 0;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem 1rem;
  padding: 2rem;
`;

const FormItem = styled.div`
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  align-items: baseline;
`;

const Input = styled.input`
  padding: 0.25rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const Select = styled.select`
  padding: 0.25rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const Textarea = styled.textarea`
  padding: 0.25rem;
  font-size: 1rem;
  resize: vertical;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const ButtonLayout = styled.div`
  display: flex;
  grid-column: 1 / -1;
  justify-content: flex-end;
`;

const ShopName = styled.h2`
  margin: 0;
  font-size: 1.75rem;
`;

const ShopImage = styled.div`
  margin-top: 1rem;

  & > img {
    width: 100%;
  }
`;

const ShopTags = styled.div`
  margin: 1.5rem 0.25rem;

  & > * + * {
    margin-left: 0.5rem;
  }
`;

const ShopDetail = styled.p`
  margin: 0 0.25rem;
`;
