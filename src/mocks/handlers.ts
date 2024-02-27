import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("*/sanctum/csrf-cookie", async () => {
    return HttpResponse.text(null, {
      status: 204,
      headers: { "Set-Cookie": "XSRF-TOKEN=123" }
    });
  }),
  http.post("*/auth/register", async () => {
    return HttpResponse.json(null, { status: 201 });
  })
];
