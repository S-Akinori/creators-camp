import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import Button from "../components/atoms/Button";
import ReactMarkdown from 'react-markdown';
import { tocText } from "@/contents/toc";

export default function AboutPage() {
    return (
        <Container className="page">
            <h1><TextShadow className="text-xl">当サイトについて</TextShadow></h1>
            <Image src="/images/logo.png" className="mx-auto" alt="about" width={545} height={123} />
            <div className="mt-8 max-w-screen-lg mx-auto">
                <p>Re-creator’s Camp には<span className="font-bold underline">「素材を再活用する、生き返らせる＝Recreate」</span>という思いを込めております。</p>
                <p>でも、単に素材が集まる場所だけではなく、素材の向こうにある<span className="font-bold underline">「創作者＝Creator」</span>の皆さま<span className="font-bold underline">が「集まる場、交流する場＝Camp」</span>であってほしい。</p>
                <p>素材を共有して、コミュニケーションをとって<span className="font-bold underline">「Re: Re: Re: 」</span>を積み重ねてほしい。</p>
                <p>そのような沢山の思いを込めて<span className="font-bold underline">「Re-creator’s Camp」</span>を立ち上げました。</p>
                <p>ぜひ皆さまの思いのこもった素材を通じて、少しでも創作活動に彩を持たせられたら幸いです</p>
            </div>
        </Container>
    );
}
