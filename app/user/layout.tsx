import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { notoSansJP } from "../fonts";


export const metadata: Metadata = {
  title: "ユーザー画面",
  description: "ゲーム開発者のための素材共有サイト",
  robots: {
    index: false
  }
};

export default function UserLayout({
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
