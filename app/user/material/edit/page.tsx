import Image from "next/image";
import Container from "@/app/components/Container";
import TextShadow from "@/app/components/TextShadow";
import Input from "@/app/components/Form/Input";
import FormControl from "@/app/components/Form/FormControl";
import Label from "@/app/components/Form/Label";
import Textarea from "@/app/components/Form/Textarea";
import Select from "@/app/components/Form/Select";
import Button from "@/app/components/Button";

const UserMaterialEditPage = () => {
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
                    <h1 className="text-2xl text-main font-bold text-center">素材アップロード</h1>
                </div>
                <div className="mt-8 mx-auto max-w-lg">
                    <form action="">
                        <FormControl flex={false}>
                            <Label htmlFor="file" className="shrink-0 mr-4">素材</Label>
                            <Input id="file" type="file" className="w-full" />
                        </FormControl>
                        <FormControl flex={false}>
                            <Label htmlFor="title" className="shrink-0 mr-4">タイトル</Label>
                            <Input id="title" type="text" className="w-full" />
                        </FormControl>
                        <FormControl flex={false}>
                            <Label htmlFor="description" className="shrink-0 mr-4">説明</Label>
                            <Textarea id="description" rows={5} className="w-full" />
                        </FormControl>
                        <FormControl flex={false}>
                            <Label htmlFor="category" className="shrink-0 mr-4">カテゴリー</Label>
                            <Select id="category" className="w-full">
                                <option value="illustration">イラスト</option>
                                <option value="music">音楽</option>
                                <option value="plugin">プラグイン</option>
                            </Select>
                        </FormControl>
                        <FormControl flex={false}>
                            <Label htmlFor="tag" className="shrink-0 mr-4">承認の有無</Label>
                            <Select id="tag" className="w-full">
                                <option value="yes">承認を必要にする</option>
                                <option value="no">承認を必要にしない</option>
                            </Select>
                        </FormControl>
                        <div className="text-center mt-8">
                            <Button className="py-4 px-16">アップロード</Button>
                        </div>
                    </form>
                </div>
            </Container>
        </main>
    );
};

export default UserMaterialEditPage;