import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import Button from "../components/atoms/Button";
import ReactMarkdown from 'react-markdown';
import { tocText } from "@/contents/toc";

export default function AdminPage() {
    return (
        <Container>
            <h1 className="mb-4"><TextShadow className="text-xl">管理画面</TextShadow></h1>
            <div className="text-center">
                管理者はこちらでお知らせの更新ができます。
            </div>
        </Container>
    );
}
