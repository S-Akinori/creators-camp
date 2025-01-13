import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { notoSansJP } from "../fonts";

export const metadata: Metadata = {
  title: "スポンサー紹介 | " + process.env.NEXT_PUBLIC_SITE_NAME,
  description: "当サイトのスポンサーをご紹介します。Re-Creator’s Campはクラウドファンディングを通じて、多くの支援者様にサポート頂くことで、スタートすることができました。重ねて感謝申し上げます。紆余曲折があり、多大なご心配をおかけいたしましたが、皆様の温かい応援もあり、ようやくサービスを開始することができました。重ねて御礼申し上げます。",
};

export default function AboutPageLayout({
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
