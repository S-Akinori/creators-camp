import type { Metadata } from "next";
import { Inter, Reggae_One } from "next/font/google";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { notoSansJP } from "../fonts";

export const metadata: Metadata = {
  title: "利用規約 | " + process.env.NEXT_PUBLIC_SITE_NAME,
  description: "利用規約についてのページです。",
};

export default function TOCLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <Header />
        <main className="py-16">
            {children}
        </main>
        <Footer />
      </>
  );
}
