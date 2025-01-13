import type { Metadata } from "next";
import { Inter, Reggae_One } from "next/font/google";
import "../globals.css";
import { notoSansJP } from "../fonts";
import Header from "../components/Header";
import Footer from "../components/Footer";

// const inter = Inter({ subsets: ["latin"] });
const reggaeOne = Reggae_One({weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "お問い合わせ | " + process.env.NEXT_PUBLIC_SITE_NAME,
  description: "リクリエイターズキャンプはゲーム開発者のための素材サイトです。お問い合わせはこちらから。",
};

export default function RootLayout({
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
