import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import Button from "../components/atoms/Button";
import ReactMarkdown from 'react-markdown';
import { tocText } from "@/contents/toc";

export default function SponserPage() {
    return (
        <Container>
            <div className="relative">
                <Image src="/images/bg-fv.png" className="mx-auto mb-4" alt="about" width={800} height={220} />
                <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"><TextShadow className="text-3xl">スポンサーの皆様</TextShadow></h1>
            </div>
            <div className="flex justify-center">
                <Image src="/images/bow2.png" sizes="(max-width: 768px) 30vw" className="" alt="about" width={300} height={300} />
                <Image src="/images/bow.png" sizes="(max-width: 768px) 30vw" alt="about" width={200} height={300} />
            </div>
            <div className="max-w-screen-lg mx-auto mt-8">
                <p>Re-Creator’s Campはクラウドファンディングを通じて、多くの支援者様にサポート頂くことで、スタートすることができました。重ねて感謝申し上げます。</p>
                <p>紆余曲折があり、多大なご心配をおかけいたしましたが、皆様の温かい応援もあり、ようやくサービスを開始することができました。</p>
                <p>重ねて御礼申し上げます。</p>
            </div>
        </Container>
    );
}
