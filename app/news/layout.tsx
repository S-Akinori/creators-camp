import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { notoSansJP } from "../fonts";

export const metadata: Metadata = {
  title: "当サイトについて",
  description: "当サイトについてのページです。",
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
