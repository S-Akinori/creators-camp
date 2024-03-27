// 'use client';
import Button from "@/app/components/atoms/Button";
import Container from "@/app/components/Container";
import TextShadow from "@/app/components/TextShadow";
import Title from "@/app/components/Title";
import { user } from "@/contents/user";
import Image from "next/image";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton, Tooltip } from "@mui/material"; import useMaterial from "@/app/lib/hooks/useMaterial";
import { getUserMaterials } from "@/app/lib/material";
import Thumbnail from "@/app/components/atoms/Thumbnail";
import UserCard from "@/app/components/organisms/UserCard";
import MaterialCard from "@/app/components/organisms/MaterialCard";
import { getCategory } from "@/app/lib/category";
import DownloadButton from "@/app/components/organisms/DownloadButton";
import LikeButton from "@/app/components/organisms/LikeButton";
import { csrf } from "@/app/lib/csrf";
import { getMaterial } from "@/app/lib/server/material";
import FavoriteButton from "@/app/components/organisms/FavoriteButton";
import PermissionRequestButton from "@/app/components/organisms/PermissionRequestButton";
import { http } from "@/app/lib/http";
import { cookies } from "next/headers";
import { PermissionToken } from "@/app/types/PermissionToken";
import { getUser } from "@/app/lib/server/user";

interface Props {
    params: {
        id: string;
    }
}


const UserDetailPage = async ({params}: Props) => {
    const user = await getUser(Number(params.id))
    const userMaterialsPagination = await getUserMaterials(user.id)

    return (
        <Container>
            <div className="sm:flex">
                <div>
                    <Image src={user.image} width={150} height={150} alt={user.name} className="rounded-full border-2 border-main" />
                </div>
                <div className="ml-4">
                    <h1 className="text-main font-bold text-3xl mb-4">{user.name}</h1>
                    <p>{user.description}</p>
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