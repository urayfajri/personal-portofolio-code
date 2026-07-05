"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Content, KeyTextField, LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { MdMenu, MdClose } from "react-icons/md";
import { usePathname } from "next/navigation";
import Button from "./Button";
import { isNavLinkActive } from "@/utils/isNavLinkActive";

const pillClassName =
  "mx-auto flex items-center justify-between rounded-[50px] border border-white/10 bg-slate-950/50 px-5 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl";

export default function NavBar({
  settings,
}: {
  settings: Content.SettingsDocument;
}) {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    setHash(window.location.hash);
  }, [pathname]);

  return (
    <nav aria-label="Main navigation">
      <div className={pillClassName}>
        <NameLogo name={settings.data.name} />
        <button
          type="button"
          aria-expanded={open}
          aria-label="Open menu"
          aria-controls="mobile-nav-drawer"
          className="block p-2 text-2xl text-slate-100 md:hidden"
          onClick={() => setOpen(true)}
        >
          <MdMenu />
        </button>
        <DesktopMenu settings={settings} pathname={pathname} hash={hash} />
      </div>

      <button
        type="button"
        aria-label="Dismiss menu"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        className={clsx(
          "fixed inset-0 z-[59] bg-slate-950/20 transition-opacity duration-300 md:hidden",
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
      />

      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        aria-hidden={!open}
        className={clsx(
          "fixed top-4 right-4 z-[60] flex w-max max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-[transform,visibility] duration-300 ease-in-out md:hidden",
          open
            ? "visible translate-x-0"
            : "invisible pointer-events-none translate-x-[calc(100%+1rem)]",
        )}
      >
        <div className="flex items-center justify-end border-b border-white/10 px-4 py-2">
          <button
            type="button"
            aria-label="Close menu"
            aria-expanded={open}
            className="block p-2 text-2xl text-slate-100"
            onClick={() => setOpen(false)}
          >
            <MdClose />
          </button>
        </div>

        <ul className="flex max-h-[min(70vh,32rem)] flex-col items-end gap-3 overflow-y-auto px-4 py-4">
          {settings.data.nav_item.map(({ link, label }) => (
            <li key={label}>
              <MobileNavLink
                link={link}
                label={label}
                pathname={pathname}
                hash={hash}
                onNavigate={() => setOpen(false)}
              />
            </li>
          ))}
          <li className="mt-2">
            <Button
              linkField={settings.data.cta_link}
              label={settings.data.cta_label}
              variant="light"
              onClick={() => setOpen(false)}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}

function NameLogo({ name }: { name: KeyTextField }) {
  return (
    <Link
      href="/"
      aria-label={name ? `Home — ${name}` : "Home page"}
      className="group inline-flex shrink-0 items-center bg-transparent p-0 transition-transform duration-300 hover:scale-105"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/photo-profile.png"
        alt=""
        width={44}
        height={44}
        decoding="async"
        className="h-9 w-9 bg-transparent object-contain object-center transition-opacity duration-300 group-hover:opacity-90 md:h-11 md:w-11"
      />
    </Link>
  );
}

function MobileNavLink({
  link,
  label,
  pathname,
  hash,
  onNavigate,
}: {
  link: LinkField;
  label: KeyTextField;
  pathname: string;
  hash: string;
  onNavigate: () => void;
}) {
  const isActive = isNavLinkActive(pathname, hash, link);

  return (
    <PrismicNextLink
      field={link}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        "block rounded-lg px-4 py-2 text-3xl font-bold transition-[color,background-color,transform] duration-200 active:scale-[0.98]",
        isActive
          ? "bg-yellow-300 text-slate-950"
          : "text-white active:bg-yellow-300/25",
      )}
    >
      {label}
    </PrismicNextLink>
  );
}

function DesktopNavLink({
  link,
  label,
  pathname,
  hash,
}: {
  link: LinkField;
  label: KeyTextField;
  pathname: string;
  hash: string;
}) {
  const isActive = isNavLinkActive(pathname, hash, link);

  return (
    <PrismicNextLink
      field={link}
      aria-current={isActive ? "page" : undefined}
      className="group relative block overflow-hidden rounded px-3 py-1 text-base font-bold"
    >
      <span
        className={clsx(
          "absolute inset-0 z-0 h-full rounded bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
          isActive ? "translate-y-0" : "translate-y-full",
        )}
      />
      <span
        className={clsx(
          "relative z-10 transition-colors duration-300",
          isActive ? "text-slate-950" : "text-white group-hover:text-slate-950",
        )}
      >
        {label}
      </span>
    </PrismicNextLink>
  );
}

function DesktopMenu({
  settings,
  pathname,
  hash,
}: {
  settings: Content.SettingsDocument;
  pathname: string;
  hash: string;
}) {
  return (
    <ul className="hidden flex-row items-center gap-1 md:flex">
      {settings.data.nav_item.map(({ link, label }, index) => (
        <React.Fragment key={label}>
          <li>
            <DesktopNavLink
              link={link}
              label={label}
              pathname={pathname}
              hash={hash}
            />
          </li>
          {index < settings.data.nav_item.length - 1 && (
            <span
              className="text-4xl leading-[0] font-thin text-slate-400"
              aria-hidden="true"
            >
              /
            </span>
          )}
        </React.Fragment>
      ))}
      <li>
        <Button
          linkField={settings.data.cta_link}
          label={settings.data.cta_label}
          className="ml-3"
          variant="dark"
        />
      </li>
    </ul>
  );
}
