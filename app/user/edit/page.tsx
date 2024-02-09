import Image from "next/image";
import Container from "@/app/components/Container";
import TextShadow from "@/app/components/TextShadow";
import FormControl from "@/app/components/Form/FormControl";
import Input from "@/app/components/Form/Input";
import Label from "@/app/components/Form/Label";
import Textarea from "@/app/components/Form/Textarea";

const UserProfileEditPage = () => {
    const user = {
        name: "サンプルユーザー",
        image: "/images/character_CLE_01.png",
        contents: ["Image 1", "Image 2", "Video 1"],
        description: "サンプルユーザーのプロフィールです。サンプルユーザーのプロフィールです。サンプルユーザーのプロフィールです。",
        email: "sample@sample.com",
    };

    return (
        <main className="min-h-screen">
            <Container>
                <div>
                    <h1><TextShadow className="text-2xl">プロフィール編集</TextShadow></h1>
                </div>
                <div className="flex mt-8">
                    <div className="mb-4 mr-4 shrink-0">
                        <Image src={user.image} width={100} height={100} alt={user.name} className="rounded-full border-2 border-main bg-main-cont rounded-full" />
                    </div>
                    <FormControl flex={false}>
                        <Label htmlFor="file" className="shrink-0 mr-4">プロフィール画像</Label>
                        <Input type="file" className="w-full" />
                    </FormControl>
                </div>
                <FormControl flex={false}>
                    <Label htmlFor="name" className="shrink-0 mr-4">ユーザー名</Label>
                    <Input id="name" type="text" className="w-full" defaultValue={user.name} />
                </FormControl>
                <FormControl flex={false}>
                    <Label htmlFor="description" className="shrink-0 mr-4">説明文
                    </Label>
                    <Textarea id="description" className="w-full">{user.description}</Textarea>
                </FormControl>
                <FormControl flex={false}>
                    <Label htmlFor="email" className="shrink-0 mr-4">メールアドレス</Label>
                    <Input id="email" type="text" className="w-full" defaultValue={user.email} />
                </FormControl>
                <FormControl flex={false}>
                    <Label htmlFor="password" className="shrink-0 mr-4">パスワード</Label>
                    <Input id="password" type="password" className="w-full" />
                </FormControl>
                <div className="text-center mt-8">
                    <button className="py-4 px-16 bg-main text-white rounded-full">保存</button>
                </div>
            </Container>
        </main>
    );
};

export default UserProfileEditPage;