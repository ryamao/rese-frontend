export function getCookieValue(name: string): string | null {
  const match = document.cookie.match(
    new RegExp("(^|;\\s*)(" + name + ")=([^;]*)")
  );
  if (match) {
    return decodeURIComponent(match[3]);
  } else {
    return null;
  }
}
