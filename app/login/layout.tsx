import type { Metadata } from "next";
import { Inter, Reggae_One } from "next/font/google";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { notoSansJP } from "../fonts";

export const metadata: Metadata = {
  title: "ログイン",
  description: "ゲーム開発者のための素材共有サイト",
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
