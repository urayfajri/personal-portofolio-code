import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";
import LiquidEtherBackground from "@/components/reactbits/LiquidEtherBackground";

const urbanist = Urbanist({
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-900">
      <body className={clsx(urbanist.className, "relative min-h-screen")}>
        <div className="pointer-events-none fixed inset-0 -z-10">
          <LiquidEtherBackground
            colors={["#009DFF", "#4B7BFF", "#8A4FFF", "#00E7FF"]}
            mouseForce={20}
            cursorSize={90}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.45}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.8}
            autoIntensity={2.4}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>
        <Header />
        {children}
        <div className="background-gradient absolute inset-0 -z-50 max-h-screen" />
        <div className="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
        <Footer />
        {/* prepare to deploy */}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
