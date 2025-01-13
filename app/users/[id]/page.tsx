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
import { Metadata, ResolvingMetadata } from "next";
import RoundedImage from "@/app/components/molecules/RoundedImage";


interface Props {
    params: {
        id: string;
    }
}

type MetadataProps = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params, searchParams }: MetadataProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = (await params).id
    const user = await getUser(Number(id))
    const previousImages = (await parent).openGraph?.images || []
    return {
        title: user.name,
        description: user.description,
        openGraph: {
            images: [user.image, ...previousImages],
        }
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
                <div className="shrink-0 mb-4">
                    <RoundedImage src={user.image} alt={user.name} width={200} />
                </div>
                <div className="md:ml-4">
                    <div className="mb-4">
                        <h1 className="text-main font-bold text-3xl mb-0 text-center md:text-left">{user.name}</h1>
                    </div>
                    <div className="flex justify-center md:justify-start mb-4">
                        {user.website && <Link href={user.website} className="rounded-full border-2 border-main flex items-center justify-center aspect-square w-8 mr-4" target="_blank"><LinkIcon /></Link>}
                        {user.x_link && <Link href={user.x_link} className="rounded-full border-2 border-main flex items-center justify-center aspect-square w-8 mr-4" target="_blank"><XIcon /></Link>}
                        {currentUser && (
                            <div className="text-center">
                                <FollowButton userId={user.id} isFollowing={isFollowing} />
                            </div>
                        )}
                    </div>
                    <p>{user.description}</p>
                </div>
            </div>
            <div className="mt-4 md:p-4 border border-main bg-white">
                <table>
                    <tbody>
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
                    </tbody>
                </table>
            </div>
            <div className="mt-16">
                <h2 className="mb-4">
                    <TextShadow className="text-xl">{user.name}さんの素材</TextShadow>
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {userMaterialsPagination.data.map((material) => (
                        <MaterialCard key={material.id} material={material} />
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default UserDetailPage;