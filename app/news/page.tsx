import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import Button from "../components/atoms/Button";
import ReactMarkdown from 'react-markdown';
import { tocText } from "@/contents/toc";
import Link from "next/link";

const newsList = [
    {id: 1, title: 'ニュース1', date: '2021-01-01', content: 'ニュース1の内容'},
    {id: 2, title: 'ニュース2', date: '2021-01-02', content: 'ニュース2の内容'},
    {id: 3, title: 'ニュース3', date: '2021-01-03', content: 'ニュース3の内容'},
]

export default function Login() {
    return (
        <Container>
            <h1 className="mb-8"><TextShadow className="text-xl">ニュース</TextShadow></h1>
            <div>
                <ul>
                    {newsList.map(news => (
                        <li key={news.id} className="mb-8 flex items-center border-b-2 border-main pb-2">
                            <p className="mr-4">{news.date}</p>
                            <h2 className="font-bold text-xl"><Link href={`/news/${news.id}`}>{news.title}</Link></h2>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    );
}
