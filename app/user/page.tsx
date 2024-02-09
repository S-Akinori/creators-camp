import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Button from "../components/Button";
import Link from "next/link";

const UserProfilePage = () => {
    const user = {
        name: "サンプルユーザー",
        image: "/images/character_CLE_01.png",
        contents: ["Image 1", "Image 2", "Video 1"],
        description: "サンプルユーザーのプロフィールです。サンプルユーザーのプロフィールです。サンプルユーザーのプロフィールです。",
    };

    return (
        <main className="min-h-screen">
            <Container>
                <div>
                    <div className="flex items-center mb-4">
                        <div>
                            <Image src={user.image} width={100} height={100} alt={user.name} className="rounded-full border-2 border-main bg-main-cont rounded-full" />
                        </div>
                        <div className="ml-4">
                            <Button><Link href='/user/edit'>プロフィール編集</Link></Button>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl text-main font-bold">{user.name}</h1>
                    </div>
                    <p>{user.description}</p>
                </div>
                <div className="mt-4">
                    <Button><Link href='/user/material/create'>素材をアップロードする</Link></Button>
                </div>
                <div className="mt-8">
                    <h2><TextShadow className="text-2xl">素材一覧</TextShadow></h2>
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
    );
};

export default UserProfilePage;