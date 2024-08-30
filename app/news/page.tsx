import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import Button from "../components/atoms/Button";
import ReactMarkdown from 'react-markdown';
import { tocText } from "@/contents/toc";
import Link from "next/link";
import { get } from "http";
import { getNews } from "../lib/news";
import { toDateString } from "../lib/functions/toDateString";


export default async function NewsIndexPage() {
    const newsList = await getNews()
    return (
        <Container>
            <h1 className="mb-8"><TextShadow className="text-xl">お知らせ</TextShadow></h1>
            <div>
                <ul>
                    {newsList.data.map(news => (
                        <li key={news.id} className="mb-8 md:flex items-center border-b-2 border-main pb-2">
                            <p className="mr-4">{toDateString(news.created_at)}</p>
                            <h2 className="font-bold md:text-xl"><Link href={`/news/${news.slug}`}>{news.title}</Link></h2>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    );
}
