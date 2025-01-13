import type { Metadata } from "next";
import { Inter, Reggae_One } from "next/font/google";
import "./globals.css";
import { notoSansJP } from "./fonts";
import GoogleAdsense from "./components/molecules/GoogleAdsense.tsx";
import { SpeedInsights } from "@vercel/speed-insights/next"

// const inter = Inter({ subsets: ["latin"] });
const reggaeOne = Reggae_One({weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "ゲーム開発者のための素材共有サイト | " + process.env.NEXT_PUBLIC_SITE_NAME,
  description: "Re-creator's Campは「素材を再活用する、生き返らせる」という意味を込めたゲーム素材共有サイトです。単に素材が集まる場所だけでなく、クリエイターのコミュニケーションの場として活用いただけます。",
  openGraph: {
    images: [
      {
        url: process.env.APP_URL + "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Re-creator's Camp",
      },
    ],
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
