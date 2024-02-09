import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import Button from "../components/Button";
import { tags } from "@/contents/tags";

export default function MaterialsIndexPage() {
    return (
        <main className="min-h-screen">
            <Container>
                <h1><TextShadow className="text-2xl">素材一覧</TextShadow></h1>
                <div className="flex flex-wrap">
                    {tags.map((tag) => (
                        <div key={tag.id} className="p-4 w-1/2 md:w-1/5">
                            <Button className="w-full py-2" color="main-cont">
                                {tag.name}
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center flex-wrap">
                    <div className="w-1/2 md:w-1/4 p-4 mb-4"><Image className="mx-auto" src="/images/material.png" width={180} height={264} alt="" /></div>
                    <div className="w-1/2 md:w-1/4 p-4 mb-4"><Image className="mx-auto" src="/images/material.png" width={180} height={264} alt="" /></div>
                    <div className="w-1/2 md:w-1/4 p-4 mb-4"><Image className="mx-auto" src="/images/material.png" width={180} height={264} alt="" /></div>
                    <div className="w-1/2 md:w-1/4 p-4 mb-4"><Image className="mx-auto" src="/images/material.png" width={180} height={264} alt="" /></div>
                    <div className="w-1/2 md:w-1/4 p-4 mb-4"><Image className="mx-auto" src="/images/material.png" width={180} height={264} alt="" /></div>
                    <div className="w-1/2 md:w-1/4 p-4 mb-4"><Image className="mx-auto" src="/images/material.png" width={180} height={264} alt="" /></div>
                    <div className="w-1/2 md:w-1/4 p-4 mb-4"><Image className="mx-auto" src="/images/material.png" width={180} height={264} alt="" /></div>
                    <div className="w-1/2 md:w-1/4 p-4 mb-4"><Image className="mx-auto" src="/images/material.png" width={180} height={264} alt="" /></div>
                </div>
                <div className="flex justify-center my-4">
                    <Button className="mx-2" color="main-cont">←</Button>
                    <Button className="mx-2" color="main">1</Button>
                    <Button className="mx-2" color="main-cont">2</Button>
                    <Button className="mx-2" color="main-cont">3</Button>
                    <Button className="mx-2" color="main-cont">→</Button>
                </div>
            </Container>
        </main>
    );
}
