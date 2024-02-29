import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import Button from "../components/atoms/Button";
import ReactMarkdown from 'react-markdown';
import { tocText } from "@/contents/toc";

export default function Login() {
    return (
        <main className="min-h-screen">
            <Container>
                <h1><TextShadow className="text-xl">利用規約</TextShadow></h1>
                <div className="p-4 mx-auto mt-8 page" style={{ background: 'rgba(255,255,255,0.6)' }}>
                    <ReactMarkdown>{tocText}</ReactMarkdown>
                </div>
            </Container>
        </main>
    );
}
