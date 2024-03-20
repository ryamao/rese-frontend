import { HttpResponse, http } from "msw";

import { OwnerShopData } from "../models";

const sampleAreas = [
  { id: 1, name: "東京都" },
  { id: 2, name: "大阪府" },
  { id: 3, name: "福岡県" }
];

const sampleGenres = [
  { id: 1, name: "寿司" },
  { id: 2, name: "焼肉" },
  { id: 3, name: "居酒屋" },
  { id: 4, name: "イタリアン" },
  { id: 5, name: "ラーメン" }
];

const sampleShops = [
  {
    id: 1,
    name: "飲食店1",
    area: { id: 1, name: "東京都" },
    genre: { id: 1, name: "寿司" },
    image_url: "https://via.placeholder.com/800x500",
    detail: "サンプルテキスト1",
    favorite_status: "unknown"
  },
  {
    id: 2,
    name: "飲食店2",
    area: { id: 2, name: "大阪府" },
    genre: { id: 2, name: "焼肉" },
    image_url: "https://via.placeholder.com/800x500",
    detail: "サンプルテキスト2",
    favorite_status: "unknown"
  },
  {
    id: 3,
    name: "飲食店3",
    area: { id: 3, name: "福岡県" },
    genre: { id: 3, name: "居酒屋" },
    image_url: "https://via.placeholder.com/800x500",
    detail: "サンプルテキスト3",
    favorite_status: "unknown"
  },
  {
    id: 4,
    name: "飲食店4",
    area: { id: 1, name: "東京都" },
    genre: { id: 4, name: "イタリアン" },
    image_url: "https://via.placeholder.com/800x500",
    detail: "サンプルテキスト4",
    favorite_status: "unknown"
  },
  {
    id: 5,
    name: "飲食店5",
    area: { id: 2, name: "大阪府" },
    genre: { id: 5, name: "ラーメン" },
    image_url: "https://via.placeholder.com/800x500",
    detail: "サンプルテキスト5",
    favorite_status: "unknown"
  }
];

const samplePaginatedShops = {
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    path: "http://localhost:8000/shops",
    per_page: 5,
    to: 5,
    total: 5
  },
  links: [
    {
      url: null,
      label: "&laquo; Previous",
      active: false
    },
    {
      url: null,
      label: "1",
      active: false
    },
    {
      url: null,
      label: "Next &raquo;",
      active: false
    }
  ],
  data: sampleShops
};

const sampleReservations = [
  {
    id: 1,
    shop: { id: 1, name: "飲食店1" },
    reserved_at: "2022-01-01T18:00:00+09:00",
    number_of_guests: 2
  },
  {
    id: 2,
    shop: { id: 1, name: "飲食店1" },
    reserved_at: "2022-01-02T19:00:00+09:00",
    number_of_guests: 4
  },
  {
    id: 3,
    shop: { id: 1, name: "飲食店1" },
    reserved_at: "2022-01-03T20:00:00+09:00",
    number_of_guests: 6
  }
];

const sampleOwnerShops: OwnerShopData[] = [
  {
    id: 1,
    name: "飲食店1",
    area: { id: 1, name: "東京都" },
    genre: { id: 1, name: "寿司" },
    image_url: "https://via.placeholder.com/800x500",
    detail: "サンプルテキスト1"
  },
  {
    id: 2,
    name: "飲食店2",
    area: { id: 2, name: "大阪府" },
    genre: { id: 2, name: "焼肉" },
    image_url: "https://via.placeholder.com/800x500",
    detail: "サンプルテキスト2"
  },
  {
    id: 3,
    name: "飲食店3",
    area: { id: 3, name: "福岡県" },
    genre: { id: 3, name: "居酒屋" },
    image_url: "https://via.placeholder.com/800x500",
    detail: "サンプルテキスト3"
  }
];

export const handlers = [
  http.get("*/sanctum/csrf-cookie", async () => {
    return HttpResponse.text(null, {
      status: 204,
      headers: { "Set-Cookie": "XSRF-TOKEN=123" }
    });
  }),
  http.post("*/owners", async () => {
    return HttpResponse.text(null, { status: 201 });
  }),
  http.post("*/notification-email", async () => {
    return HttpResponse.text(null, { status: 201 });
  }),
  http.post("*/auth/register", async () => {
    return HttpResponse.text(null, { status: 201 });
  }),
  http.post("*/auth/login", async () => {
    return HttpResponse.text(null, { status: 204 });
  }),
  http.post("*/auth/logout", async () => {
    return HttpResponse.text(null, { status: 204 });
  }),
  http.get("*/auth/status", () => {
    return HttpResponse.json({ status: "customer", id: 1 });
  }),
  http.get("*/owners/:ownerId/shops", () => {
    return HttpResponse.json({ data: sampleOwnerShops });
  }),
  http.get("*/areas", () => {
    return HttpResponse.json({
      areas: sampleAreas
    });
  }),
  http.get("*/genres", () => {
    return HttpResponse.json({
      genres: sampleGenres
    });
  }),
  http.get("*/shops", () => {
    return HttpResponse.json(samplePaginatedShops);
  }),
  http.get("*/shops/1", () => {
    return HttpResponse.json({ data: sampleShops[0] });
  }),
  http.get("*/customers/1", () => {
    return HttpResponse.json({
      name: "テストユーザー"
    });
  }),
  http.get("*/customers/:customerId/favorites", async () => {
    return HttpResponse.json(samplePaginatedShops);
  }),
  http.post("*/customers/:customerId/shops/:shopId/favorite", async () => {
    return HttpResponse.text(null, { status: 204 });
  }),
  http.delete("*/customers/:customerId/shops/:shopId/favorite", async () => {
    return HttpResponse.text(null, { status: 204 });
  }),
  http.get("*/customers/:customerId/reservations", () => {
    return HttpResponse.json({ data: sampleReservations });
  }),
  http.get("*/customers/:customerId/shops/:shopId/reservations", () => {
    return HttpResponse.json({ reservations: sampleReservations });
  }),
  http.post("*/customers/:customerId/shops/:shopId/reservations", async () => {
    return HttpResponse.json({
      reservation: {
        id: 4,
        shop: { id: 1, name: "飲食店1" },
        reserved_at: "2022-01-04T21:00:00+09:00",
        number_of_guests: 8
      }
    });
  }),
  http.put("*/customers/:customerId/reservations/:reservationId", async () => {
    return HttpResponse.text(null, { status: 204 });
  }),
  http.delete(
    "*/customers/:customerId/reservations/:reservationId",
    async () => {
      return HttpResponse.text(null, { status: 204 });
    }
  )
];
