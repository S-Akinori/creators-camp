import Container from "@/app/components/Container";
import TextShadow from "@/app/components/TextShadow";
import Image from "next/image";
import { getUserMaterials } from "@/app/lib/material";
import MaterialCard from "@/app/components/organisms/MaterialCard";
import { getUser } from "@/app/lib/server/user";
import {getUser as auth} from "@/app/lib/auth"
import FollowButton from "@/app/components/organisms/FollowButton";
import { getIsFollowing } from "@/app/lib/server/follow";

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
                    <h1 className="text-main font-bold text-3xl mb-4 text-left">{user.name}</h1>
                    <p>{user.description}</p>
                    {currentUser && (
                        <div className="text-center mt-4">
                            <FollowButton userId={user.id} isFollowing={isFollowing} />
                        </div>
                    )}
                </div>
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