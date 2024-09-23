import Container from "@/app/components/Container";
import TextShadow from "@/app/components/TextShadow";
import Image from "next/image";
import { getUserMaterials } from "@/app/lib/material";
import MaterialCard from "@/app/components/organisms/MaterialCard";
import { getUser } from "@/app/lib/server/user";
import {getUser as auth} from "@/app/lib/auth"
import FollowButton from "@/app/components/organisms/FollowButton";
import { getIsFollowing } from "@/app/lib/server/follow";
import XIcon from '@mui/icons-material/X';
import LinkIcon from '@mui/icons-material/Link';
import Link from "next/link";


interface Props {
    params: {
        id: string;
    }
}

const UserDetailPage = async ({params}: Props) => {
    const currentUser = await auth()
    const user = await getUser(Number(params.id))
    const userMaterialsPagination = await getUserMaterials(user.id)
    const isFollowing = currentUser ? await getIsFollowing(user.id) : false

    return (
        <Container>
            <div className="sm:flex">
                <div className="shrink-0">
                    <Image src={user.image} width={150} height={150} alt={user.name} className="rounded-full border-2 border-main" />
                </div>
                <div className="ml-4">
                    <div className="flex items-center mb-4">
                        <h1 className="text-main font-bold text-3xl mb-0 text-left mr-4">{user.name}</h1>
                        {currentUser && (
                            <div className="text-center">
                                <FollowButton userId={user.id} isFollowing={isFollowing} />
                            </div>
                        )}
                    </div>
                    <div className="flex">
                        {user.website && <Link href={user.website} className="rounded-full border-2 border-main flex items-center justify-center aspect-square w-8 mr-4" target="_blank"><LinkIcon /></Link>}
                        {user.x_link && <Link href={user.x_link} className="rounded-full border-2 border-main flex items-center justify-center aspect-square w-8" target="_blank"><XIcon /></Link>}
                    </div>
                    <p>{user.description}</p>
                </div>
            </div>
            <div className="mt-4 p-4 border border-main bg-white">
                <table>
                    <tr>
                        <th className="text-left p-2">クリエイタータイプ</th>
                        <td>{user.role}</td>
                    </tr>
                    <tr>
                        <th className="text-left p-2">スキル</th>
                        <td>{user.skill}</td>
                    </tr>
                    <tr>
                        <th className="text-left p-2">作ったゲーム</th>
                        <td>{user.created_game}</td>
                    </tr>
                    <tr>
                        <th className="text-left p-2">貢献したゲーム</th>
                        <td>{user.contributed_game}</td>
                    </tr>
                </table>
            </div>
            <div className="mt-16">
                <h2 className="mb-4">
                    <TextShadow className="text-xl">{user.name}さんの素材</TextShadow>
                </h2>
                <div className="flex flex-wrap">
                    {userMaterialsPagination.data.map((material) => (
                        <MaterialCard key={material.id} material={material} />
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default UserDetailPage;