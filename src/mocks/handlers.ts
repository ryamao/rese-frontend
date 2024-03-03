import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("*/sanctum/csrf-cookie", async () => {
    return HttpResponse.text(null, {
      status: 204,
      headers: { "Set-Cookie": "XSRF-TOKEN=123" }
    });
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
  http.get("*/areas", () => {
    return HttpResponse.json({
      areas: [
        { id: 1, name: "東京都" },
        { id: 2, name: "大阪府" },
        { id: 3, name: "福岡県" }
      ]
    });
  }),
  http.get("*/genres", () => {
    return HttpResponse.json({
      genres: [
        { id: 1, name: "寿司" },
        { id: 2, name: "焼肉" },
        { id: 3, name: "居酒屋" },
        { id: 4, name: "イタリアン" },
        { id: 5, name: "ラーメン" }
      ]
    });
  })
];
