import { asLink, LinkField } from "@prismicio/client";

export function isNavLinkActive(
  pathname: string,
  hash: string,
  link: LinkField,
): boolean {
  const href = asLink(link) ?? "";
  const [linkPath, linkHash = ""] = href.split("#");
  const normalizedPath = linkPath || "/";

  if (linkHash) {
    return pathname === normalizedPath && hash === `#${linkHash}`;
  }

  if (normalizedPath === "/") {
    return pathname === "/" && !hash;
  }

  return (
    pathname === normalizedPath || pathname.startsWith(`${normalizedPath}/`)
  );
}
