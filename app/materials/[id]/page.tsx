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

interface Props {
    params: {
        id: string;
    }
}

const MaterialDetailPage = async ({ params }: Props) => {
    const material = await getMaterial(Number(params.id))
    const userMaterials = await getUserMaterials(material.user.id)
    const category = await getCategory(material.category_id)
    console.log(material)

    return (
        <Container>
            <div className="md:flex">
                <div className="md:w-1/2">
                    <h1 className="text-main font-bold text-3xl mb-4">{material.name}</h1>
                    <div className="border-main border-2">
                        <Thumbnail src={material.image} alt={material.name} />
                    </div>
                    <div>
                        <p>{material.description}</p>
                    </div>
                    <div>
                        {material.permission == 1 && (
                            <>
                                <Button className="mt-8 w-full py-4">クリエイターへ承認依頼する</Button>
                                <p>この素材はクリエイターへの承認依頼が必要です</p>
                            </>
                        )}
                        {material.permission == 0 && (
                            <DownloadButton id={params.id} name={material.name}>ダウンロード</DownloadButton>
                        )}
                    </div>
                </div>
                <div className="md:w-1/2 p-4">
                    <div className="bg-white p-4 h-full">
                        <h2 className="mb-4 text-center text-main text-2xl">
                            ユーザー情報
                        </h2>
                        <div>
                            <Image src={material.user.image} width={200} height={200} alt={material.user.name} className="rounded-full mx-auto border-main border" />
                            <p className="text-center text-main text-xl">{material.user.name}</p>
                            <p className="text-center">{material.user.description}</p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center mt-4">
                            <LikeButton materialId={material.id} defaultLiked={material.likes.length > 0} likeId={material.likes.length > 0 ? material.likes[0].id : null} />
                            <FavoriteButton materialId={material.id} defaultFavorited={material.favorites.length > 0} favoriteId={material.favorites.length > 0 ? material.favorites[0].id : null} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-16">
                <h2 className="mb-4">
                    <TextShadow className="text-xl">{user.name}さんの</TextShadow>
                    <TextShadow className="text-xl">その他の素材</TextShadow>
                </h2>
                <div className="flex flex-wrap">
                    {userMaterials.map((material) => (
                        <MaterialCard key={material.id} material={material} />
                    ))}
                </div>
            </div>
            <div className="mt-16">
                <h2 className="mb-4">
                    <TextShadow className="text-xl">同じカテゴリーの素材</TextShadow>
                </h2>
                <div className="flex flex-wrap">
                    {category.materials.map((material) => (
                        <MaterialCard key={material.id} material={material} />
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default MaterialDetailPage;