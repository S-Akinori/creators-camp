import type { Metadata } from "next";
import { Inter, Reggae_One } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import TypekitLoader from "./components/TypekitLoader";
import Header from "./components/Header";
import Footer from "./components/Footer";

// const inter = Inter({ subsets: ["latin"] });
const reggaeOne = Reggae_One({weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "クリエイターズキャンプ",
  description: "ゲーム開発者のための素材共有サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={reggaeOne.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
