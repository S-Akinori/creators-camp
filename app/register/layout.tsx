import type { Metadata } from "next";
import { Inter, Reggae_One } from "next/font/google";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { notoSansJP } from "../fonts";

// const inter = Inter({ subsets: ["latin"] });
const reggaeOne = Reggae_One({weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "ユーザー登録 | " + process.env.NEXT_PUBLIC_SITE_NAME,
  description: `ゲーム開発者のための素材共有サイト${process.env.NEXT_PUBLIC_SITE_NAME}に無料登録して素材を共有しよう。揃えよう。話し合おう。`,
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
