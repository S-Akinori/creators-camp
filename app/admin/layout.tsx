import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { notoSansJP } from "../fonts";
import AdminHeader from "../components/Header/AdminHeader";
import AdminMenu from "../components/AdminMenu";

export const metadata: Metadata = {
  title: "管理画面",
  description: "管理画面",
};

export default function AdminPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminMenu />
      <main className="py-16 min-h-screen">
          <div className="ml-40">
              {children}
          </div>
      </main>
      <Footer />
    </>
  );
}
