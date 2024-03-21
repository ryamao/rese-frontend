import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PageBase } from "./PageBase";
import { blueButton, whitePanel } from "../components/styles";
import { PostOwnerShopsBody } from "../models";

export function OwnerShopPage() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<PostOwnerShopsBody>({
    resolver: zodResolver(schema)
  });

  const fileList = watch("image") as unknown as FileList;
  const imageUrl =
    fileList && fileList.length > 0 ? URL.createObjectURL(fileList[0]) : null;

  function onValid(data: PostOwnerShopsBody) {
    console.log(data);
  }

  return (
    <PageBase>
      <Main>
        <section>
          <div className={whitePanel}>
            <FormTitle>New Shop</FormTitle>
            <Form onSubmit={handleSubmit(onValid)}>
              <FormItem>
                <label htmlFor="name">店舗名</label>
                <InputWrapper>
                  <Input type="text" id="name" {...register("name")} />
                  <ErrorMessage>{errors.name?.message}</ErrorMessage>
                </InputWrapper>
              </FormItem>
              <FormItem>
                <label htmlFor="area">エリア</label>
                <InputWrapper>
                  <Select id="area" {...register("area")}>
                    <option defaultChecked></option>
                    {areas.map((area, index) => (
                      <option key={index} value={area}>
                        {area}
                      </option>
                    ))}
                  </Select>
                  <ErrorMessage>{errors.area?.message}</ErrorMessage>
                </InputWrapper>
              </FormItem>
              <FormItem>
                <label htmlFor="genre">ジャンル</label>
                <InputWrapper>
                  <Input type="text" id="genre" {...register("genre")} />
                  <ErrorMessage>{errors.genre?.message}</ErrorMessage>
                </InputWrapper>
              </FormItem>
              <FormItem>
                <label htmlFor="image">画像</label>
                <InputWrapper>
                  <input type="file" id="image" {...register("image")} />
                  <ErrorMessage>{errors.image?.message}</ErrorMessage>
                </InputWrapper>
              </FormItem>
              <FormItem>
                <label htmlFor="detail">詳細</label>
                <InputWrapper>
                  <Textarea
                    id="detail"
                    rows={10}
                    {...register("detail")}
                  ></Textarea>
                  <ErrorMessage>{errors.detail?.message}</ErrorMessage>
                </InputWrapper>
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
          <ShopName>{watch("name") || "店舗名"}</ShopName>
          <ShopImage>
            <img
              src={
                imageUrl ?? "https://via.placeholder.com/400x300?text=no+image"
              }
              alt="店舗名"
            />
          </ShopImage>
          <ShopTags>
            <span>#{watch("area") || "エリア名"}</span>
            <span>#{watch("genre") || "ジャンル名"}</span>
          </ShopTags>
          <ShopDetail>{watch("detail")}</ShopDetail>
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

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
`;

const ErrorMessage = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: red;
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

const schema = z.object({
  name: z
    .string()
    .min(1, "店舗名を入力してください")
    .max(100, "店舗名は100文字以内で入力してください"),
  area: z.string().min(1, "エリアを選択してください"),
  genre: z
    .string()
    .min(1, "ジャンルを入力してください")
    .max(100, "ジャンルは100文字以内で入力してください"),
  image: z
    .custom<FileList>()
    .refine((files) => files.length > 0, "画像を選択してください")
    .transform((files) => files[0]),
  detail: z.string().min(1, "詳細を入力してください")
});

const areas = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県"
];
