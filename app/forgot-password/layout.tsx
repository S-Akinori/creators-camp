import type { Metadata } from "next";
import { Inter, Reggae_One } from "next/font/google";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { notoSansJP } from "../fonts";

export const metadata: Metadata = {
  title: "メール認証",
  description: "ゲーム開発者のための素材共有サイト",
  robots: {
    index: false,
  }
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
