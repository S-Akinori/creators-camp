import type { Metadata } from "next";
import { Inter, Reggae_One } from "next/font/google";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

// const inter = Inter({ subsets: ["latin"] });
const reggaeOne = Reggae_One({weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "素材検索",
  description: "ゲーム開発者のための素材共有サイト",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={reggaeOne.className}>
        <Header />
        <main className="py-16 min-h-screen">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
