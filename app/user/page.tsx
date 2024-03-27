import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Button from "../components/atoms/Button";
import Link from "next/link";
import { getUser } from "../lib/auth";
import { getUserMaterials } from "../lib/material";
import MaterialList from "../components/organisms/MaterialList";
import LogoutButton from "../components/organisms/LogoutButton";
import { reggaeOne } from "../fonts";

const UserProfilePage = async () => {
    const user = await getUser();
    const materialsPagination = await getUserMaterials(user.id);

    return (
        <Container className={reggaeOne.className}>
            <div>
                <div className="flex items-center mb-4">
                    <div>
                        <Image src={user.image} width={100} height={100} alt={user.name} className="rounded-full border-2 border-main bg-main-cont rounded-full" />
                    </div>
                    <div className="ml-4">
                        <div className="mb-4">
                            <Button><Link href='/user/edit'>プロフィール編集</Link></Button>
                        </div>
                        <div>
                            <LogoutButton />
                        </div>
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
                <MaterialList materials={materialsPagination.data} />
            </div>
        </Container>
    );
};

export default UserProfilePage;