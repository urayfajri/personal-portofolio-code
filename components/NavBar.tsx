"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { Content, KeyTextField, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { MdMenu, MdClose } from "react-icons/md";
import { usePathname } from "next/navigation";
import Button from "./Button";

export default function NavBar({
  settings,
}: {
  settings: Content.SettingsDocument;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="mx-auto flex flex-col justify-between rounded-[50px] border border-white/10 bg-slate-950/50 px-5 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <NameLogo name={settings.data.name} />
          <button
            aria-expanded={open}
            aria-label="Open menu"
            className="block p-2 text-2xl text-slate-100 md:hidden"
            onClick={() => setOpen(true)}
          >
            <MdMenu />
          </button>
        </div>
        <div
          className={clsx(
            "fixed top-0 right-0 bottom-0 left-0 z-50 flex flex-col items-end gap-4 bg-slate-950/90 pt-14 pr-4 backdrop-blur-xl transition-transform duration-300 ease-in-out md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]",
          )}
        >
          <button
            aria-label="Close menu"
            aria-expanded={open}
            className="fixed top-3 right-4 block p-2 text-2xl text-slate-100 md:hidden"
            onClick={() => setOpen(false)}
          >
            <MdClose />
          </button>
          {settings.data.nav_item.map(({ link, label }, index) => (
            <React.Fragment key={label}>
              <li className="first:mt-8">
                <PrismicNextLink
                  className="group relative block overflow-hidden rounded px-3 text-3xl font-bold"
                  field={link}
                  onClick={() => setOpen(false)}
                  aria-current={
                    pathname.includes(asLink(link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  <span
                    className={clsx(
                      "absolute inset-0 z-0 h-full rounded bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
                      pathname.includes(asLink(link) as string)
                        ? "translate-y-0"
                        : "translate-y-full",
                    )}
                  />
                  <span
                    className={clsx(
                      "relative z-10 transition-colors duration-300",
                      pathname.includes(asLink(link) as string)
                        ? "text-slate-950"
                        : "text-white group-hover:text-slate-950",
                    )}
                  >
                    {label}
                  </span>
                </PrismicNextLink>
              </li>
              {index < settings.data.nav_item.length - 1 && (
                <span
                  className="hidden text-4xl leading-[0] font-thin text-slate-400 md:inline"
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
        </div>
        <DesktopMenu settings={settings} pathname={pathname} />
      </ul>
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

function DesktopMenu({
  settings,
  pathname,
}: {
  settings: Content.SettingsDocument;
  pathname: string;
}) {
  return (
    <div className="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
      {settings.data.nav_item.map(({ link, label }, index) => (
        <React.Fragment key={label}>
          <li>
            <PrismicNextLink
              className="group relative block overflow-hidden rounded px-3 py-1 text-base font-bold"
              field={link}
              aria-current={
                pathname.includes(asLink(link) as string) ? "page" : undefined
              }
            >
              <span
                className={clsx(
                  "absolute inset-0 z-0 h-full rounded bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
                  pathname.includes(asLink(link) as string)
                    ? "translate-y-0"
                    : "translate-y-full",
                )}
              />
              <span
                className={clsx(
                  "relative z-10 transition-colors duration-300",
                  pathname.includes(asLink(link) as string)
                    ? "text-slate-950"
                    : "text-white group-hover:text-slate-950",
                )}
              >
                {label}
              </span>
            </PrismicNextLink>
          </li>
          {index < settings.data.nav_item.length - 1 && (
            <span
              className="hidden text-4xl leading-[0] font-thin text-slate-400 md:inline"
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
    </div>
  );
}
