export function isUsableExternalLink(href?: string) {
  return Boolean(href && href !== "#" && href !== "https://github.com/");
}

export function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}
