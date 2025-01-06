import type { Metadata } from "next";
import { Inter, Reggae_One } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import TypekitLoader from "./components/TypekitLoader";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { notoSansJP } from "./fonts";
import GoogleAdsense from "./components/molecules/GoogleAdsense.tsx";
import { SpeedInsights } from "@vercel/speed-insights/next"

// const inter = Inter({ subsets: ["latin"] });
const reggaeOne = Reggae_One({weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "クリエイターズキャンプ",
  description: "ゲーム開発者のための素材共有サイトです。誰でも素材の共有ができます。",
  robots: {
    index: false
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <GoogleAdsense pId="1983473550632743" />
      <body className={notoSansJP.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
