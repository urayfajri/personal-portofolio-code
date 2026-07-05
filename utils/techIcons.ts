import type { IconType } from "react-icons";
import {
  SiCss3,
  SiDocker,
  SiFigma,
  SiGit,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";

function normalizeTechName(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, "").replace(/\./g, "");
}

const TECH_ICON_MAP: Record<string, IconType> = {
  react: SiReact,
  reactjs: SiReact,
  typescript: SiTypescript,
  ts: SiTypescript,
  nextjs: SiNextdotjs,
  next: SiNextdotjs,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  javascript: SiJavascript,
  js: SiJavascript,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,
  prisma: SiPrisma,
  threejs: SiThreedotjs,
  figma: SiFigma,
  graphql: SiGraphql,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mongodb: SiMongodb,
  mongo: SiMongodb,
  docker: SiDocker,
  git: SiGit,
  html5: SiHtml5,
  html: SiHtml5,
  css3: SiCss3,
  css: SiCss3,
};

export function getTechIcon(name: string | null | undefined): IconType | null {
  if (!name) return null;
  return TECH_ICON_MAP[normalizeTechName(name)] ?? null;
}
