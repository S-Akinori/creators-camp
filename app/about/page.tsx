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
        <Container>
            <h1><TextShadow className="text-xl">当サイトについて</TextShadow></h1>
        </Container>
    );
}
