import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import Button from "../components/atoms/Button";
import ReactMarkdown from 'react-markdown';
import { tocText } from "@/contents/toc";
import clsx from "clsx";
import { reggaeOne } from "../fonts";

export default function AboutPage() {
    return (
        <Container className="page">
            <h1><TextShadow className="text-2xl mb-8">当サイトについて</TextShadow></h1>
            <Image src="/images/logo.png" className="mx-auto" alt="about" width={1090} height={246} />
            <div className="mt-16 max-w-screen-lg mx-auto text-xl">
                <p>Re-creator’s Camp には<span className="font-bold underline">「素材を再活用する、生き返らせる＝Recreate」</span>という思いを込めております。</p>
                <p>でも、単に素材が集まる場所だけではなく、素材の向こうにある<span className="font-bold underline">「創作者＝Creator」</span>の皆さま<span className="font-bold underline">が「集まる場、交流する場＝Camp」</span>であってほしい。</p>
                <p>素材を共有して、コミュニケーションをとって<span className="font-bold underline">「Re: Re: Re: 」</span>を積み重ねてほしい。</p>
                <p>そのような沢山の思いを込めて<span className="font-bold underline">「Re-creator’s Camp」</span>を立ち上げました。</p>
                <p>ぜひ皆さまの思いのこもった素材を通じて、少しでも創作活動に彩を持たせられたら幸いです</p>
            </div>
            <div className="relative text-center mt-40">
                <Image src="/images/bg-camp.png" width={570} height={180} alt="クリエイターズキャンプ" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1/5 max-w-60 aspect-[2/3]"><Image src="/images/character_RECY_01.png" width={200} height={150} alt="" className="absolute top-1/2 -translate-y-1/2 right-0" /></div>
                <div className="relative"><Button href="/register"><TextShadow className={clsx(["text-3xl", reggaeOne.className])}>新規登録</TextShadow></Button></div>
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1/5 max-w-60 aspect-square"><Image src="/images/character_CLE_01.png" fill alt="" /></div>
            </div>
        </Container>
    );
}
