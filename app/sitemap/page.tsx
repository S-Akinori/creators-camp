import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import Button from "../components/atoms/Button";
import ReactMarkdown from 'react-markdown';
import { tocText } from "@/contents/toc";
import Link from "next/link";

const sitemaps = [
    { title: '利用規約', href: '/toc' },
    { title: 'お問い合わせ', href: '/contact' },
    { title: 'サイトについて', href: '/about' },
    { title: 'サイトマップ', href: '/sitemap' },
    { title: 'スポンサー', href: '/sponsor' },
    { title: 'ログイン', href: '/login' },
    { title: '新規登録', href: '/register' },
    { title: 'マイページ', href: '/user' },
    { title: 'ユーザー一覧', href: '/users' },
    { title: '素材一覧', href: '/materials' },
]

export default function SitemapPage() {
    return (
        <Container>
            <h1 className="mb-8"><TextShadow className="text-xl">サイトマップ</TextShadow></h1>
            <div>
                <ul className="list-disc">
                {sitemaps.map((sitemap, i) => (
                    <li key={i} className="mb-4">
                        <Link href={sitemap.href}>{sitemap.title}</Link>
                    </li>
                ))}
                </ul>
            </div>
        </Container>
    );
}
