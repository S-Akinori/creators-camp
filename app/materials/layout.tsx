import type { Metadata } from "next";
import { Inter, Reggae_One } from "next/font/google";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { notoSansJP } from "../fonts";

// const inter = Inter({ subsets: ["latin"] });
const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ユニークなゲーム素材が集まる。ゲーム素材一覧 | " + process.env.NEXT_PUBLIC_SITE_NAME,
  description: `ゲーム開発者のための素材共有サイト${process.env.NEXT_PUBLIC_SITE_NAME}の素材一覧です。ツール、プラグイン、音楽、UIなど様々なカテゴリーの素材を自由に検索してダウンロードできます。`,
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="py-16 min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
