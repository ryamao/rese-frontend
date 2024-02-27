import { getCookieValue } from "./utils";

export async function fetchCsrfToken(): Promise<string | null> {
  const response = await fetch(
    new URL("/sanctum/csrf-cookie", import.meta.env.VITE_API_URL),
    {
      credentials: "include"
    }
  );

  if (response.ok) {
    return getCookieValue("XSRF-TOKEN");
  } else {
    return null;
  }
}
