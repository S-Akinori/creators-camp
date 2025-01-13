import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { notoSansJP } from "../fonts";

export const metadata: Metadata = {
  title: "当サイトについて | " + process.env.NEXT_PUBLIC_SITE_NAME,
  description: "Re-creator’s Camp には「素材を再活用する、生き返らせる＝Recreate」という思いを込めております。でも、単に素材が集まる場所だけではなく、素材の向こうにある「創作者＝Creator」の皆さまが「集まる場、交流する場＝Camp」であってほしい。素材を共有して、コミュニケーションをとって「Re: Re: Re: 」を積み重ねてほしい。そのような沢山の思いを込めて「Re-creator’s Camp」を立ち上げました。",
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
