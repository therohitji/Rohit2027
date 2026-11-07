export function assetUrl(t) {
  return t
    ? /^(https?:)?\/\//.test(t) || t.startsWith("data:") || t.startsWith("/")
      ? t
      : `/${t}`
    : "";
}
