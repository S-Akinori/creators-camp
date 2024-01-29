import Link from "next/link";
import Container from "../Container";
import TextShadow from "../TextShadow";

const Footer = () => {
  return (
    <footer className="footer bg-accent px-4 py-8 border-2 border-main">
    <Container>
        <div className="flex justify-center flex-wrap">
            <Link href=''><TextShadow className="text-xl">ご利用規約</TextShadow></Link>
            <Link href=''><TextShadow className="text-xl">お問い合わせ</TextShadow></Link>
            <Link href=''><TextShadow className="text-xl">サイトについて</TextShadow></Link>
            <Link href=''><TextShadow className="text-xl">サイトマップ</TextShadow></Link>
            <Link href=''><TextShadow className="text-xl">スポンサー</TextShadow></Link>
        </div>
    </Container>
    </footer>
  );
}

export default Footer;