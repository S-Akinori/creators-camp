import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { notoSansJP } from "../fonts";

export const metadata: Metadata = {
  title: "スポンサー紹介",
  description: "当サイトのスポンサーをご紹介します",
};

export default function AboutPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <Header />
        <main className="py-16 min-h-screen">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
