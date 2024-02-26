import { getCookieValue } from "./utils";

describe("getCookieValue", () => {
  test("returns cookie value", () => {
    document.cookie = "XSRF-TOKEN=123";
    expect(getCookieValue("XSRF-TOKEN")).toBe("123");
  });

  test("returns null if cookie not found", () => {
    expect(getCookieValue("TEST")).toBeNull();
  });
});
