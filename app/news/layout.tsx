import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { notoSansJP } from "../fonts";

export const metadata: Metadata = {
  title: "お知らせ | " + process.env.NEXT_PUBLIC_SITE_NAME,
  description: "運営者のお知らせ一覧です。",
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
