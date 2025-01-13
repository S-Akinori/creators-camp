import type { Metadata } from "next";
import { Inter, Reggae_One } from "next/font/google";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

// const inter = Inter({ subsets: ["latin"] });
const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ユニークなゲームクリエイターが集まる。ユーザー一覧 | " + process.env.NEXT_PUBLIC_SITE_NAME,
  description: `ゲーム開発者のための素材共有サイト${process.env.NEXT_PUBLIC_SITE_NAME}のユーザー一覧です。ユーザー一覧から気になるユーザーを見つけてフォローしよう。`,
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
