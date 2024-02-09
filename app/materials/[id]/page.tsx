import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import TextShadow from "@/app/components/TextShadow";
import Title from "@/app/components/Title";
import { user } from "@/contents/user";
import Image from "next/image";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton, Tooltip } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

interface Props {
    params: {
        id: string;
    }
}

const MaterialDetailPage = ({ params }: Props) => {
    const material = {
        id: 1,
        name: "サンプル素材",
        description: "ゲーム制作者のための素材です。ゲーム制作者のための素材です。ゲーム制作者のための素材です。",
        image: "/images/material.png",
    }
    return (
        <main className="min-h-screen">
            <Container>
                <div className="md:flex">
                    <div className="mr-4 mb-4">
                        <Image src={material.image} width={180} height={264} alt={material.name} />
                    </div>
                    <div>
                        <div>
                            <h1 className="text-main font-bold text-3xl mb-4">{material.name}</h1>
                            <p>{material.description}</p>
                        </div>
                        <div className="flex items-center">
                            <Tooltip title="お気に入り">
                                <IconButton>
                                    <StarBorderIcon className="fill-main" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="いいね">
                                <IconButton>
                                    <ThumbUpOffAltIcon className="fill-main" />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div>
                            <Button className="mt-8">ダウンロード</Button>
                        </div>
                        <div className="flex items-center mt-4">
                            <Image src={user.image} width={80} height={80} alt={user.name} className="rounded-full border-2 border-main bg-main-cont rounded-full" />
                            <p className="ml-4">{user.name}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h2>
                        <TextShadow className="text-xl">{user.name}さんの</TextShadow>
                        <TextShadow className="text-xl">その他の素材</TextShadow>
                    </h2>
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
                </div>
                <div className="mt-8">
                    <h2>
                        <TextShadow className="text-xl">同じカテゴリーの素材</TextShadow>
                    </h2>
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
                </div>
            </Container>
        </main>
    )

}

export default MaterialDetailPage;