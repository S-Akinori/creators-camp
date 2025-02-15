import Button from "@/app/components/atoms/Button";
import Container from "@/app/components/Container";
import TextShadow from "@/app/components/TextShadow";
import Image from "next/image";
import { getMaterials, getUserMaterials } from "@/app/lib/material";
import Thumbnail from "@/app/components/atoms/Thumbnail";
import MaterialCard from "@/app/components/organisms/MaterialCard";
import DownloadButton from "@/app/components/organisms/DownloadButton";
import LikeButton from "@/app/components/organisms/LikeButton";
import { getMaterial } from "@/app/lib/server/material";
import FavoriteButton from "@/app/components/organisms/FavoriteButton";
import PermissionRequestButton from "@/app/components/organisms/PermissionRequestButton";
import { PermissionToken } from "@/app/types/PermissionToken";
import clsx from "clsx";
import { reggaeOne } from "@/app/fonts";
import { getUser } from "@/app/lib/auth";
import MaterialDeleteButton from "@/app/components/organisms/MaterialDeleteButton";
import { identifyFileTypeByExtension } from "@/app/lib/identifyFileTypeByExtension";
import PreviewButton from "@/app/components/organisms/PreviewButton";
import Link from "next/link";
import { getComments } from "@/app/lib/server/comment";
import FollowButton from "@/app/components/organisms/FollowButton";
import { getIsFollowing } from "@/app/lib/server/follow";
import ShareButtons from "@/app/components/organisms/ShareButtons";
import { limitStringLengthWithEllipsis } from "@/app/lib/functions/limitStringLengthWithEllipsis";
import CommentClient from "@/app/components/organisms/CommentClient";
import ReportButton from "@/app/components/organisms/ReportButton";
import { Material } from "@/app/types/Material";
import RoundedImage from "../molecules/RoundedImage";

const checkPermissionState = (required: number, permission_tokens: PermissionToken[]) => {
    console.log('required: ', required)
    if (required == 0) return 'approved'
    else if (permission_tokens.length && permission_tokens[0].is_active == 1) return 'pending'
    else if (permission_tokens.length && permission_tokens[0].is_active == 0 && permission_tokens[0].is_approved == 0) return 'disapproved'
    else if (permission_tokens.length && permission_tokens[0].is_active == 0 && permission_tokens[0].is_approved == 1) return 'approved'
    else return 'ready'
}

interface Props {
    id: number
    material: Material
}

const MaterialDetail = async ({id, material}: Props) => {
    const user = await getUser()
    // const material = await getMaterial(id)
    const userMaterialsPagination = await getUserMaterials(material.user.id)
    const relatedMaterialsPagination = material.category_id > 0 ? await getMaterials({category_id: material.category_id}) : await getMaterials()
    const permissionState = user ? checkPermissionState(material.permission, material.permission_tokens) : 'ready'
    const fileType = identifyFileTypeByExtension(material.file)
    const comments = await getComments(material.id)
    const isFollowing = user ? await getIsFollowing(material.user.id) : false
    return (
        <>
            <div className="md:flex">
                <div className="md:w-2/3">
                    <div className="bg-white shadow p-4 relative">
                        <h1 className={clsx(["text-main font-bold text-3xl mb-4", reggaeOne.className])}>{material.name}</h1>
                        {(material.is_ai_generated == 1) && (
                            <div className="absolute top-4 right-4 rounded-full border-2 border-main text-main font-bold w-12 aspect-square text-center leading-tight">
                                AI<br />
                                利用
                            </div>
                        )}
                        {(material.user_id == user?.id) && (
                            <div className="md:flex">
                                <Button href={`/user/material/edit/${material.id}`} className={clsx([reggaeOne.className, 'mb-4 mx-2'])}>素材を編集する</Button>
                                <MaterialDeleteButton material={material} />
                            </div>
                        )}
                        <div className="relative border-main border-2">
                            <Thumbnail src={material.image} alt={material.name} />
                            {(fileType === 'music' || fileType === 'video') && (
                                <div className="absolute left-0 top-0 w-full h-full flex justify-center items-end">
                                    <PreviewButton className="mb-4" id={material.id} fileType={fileType} />
                                </div>
                            )}
                        </div>
                        <div className="flex mt-4">
                            {material.images && material.images.map((image, index) => (
                                <div key={index} className="p-2 md:w-1/3">
                                    <Thumbnail src={image} alt={material.name} />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-end mt-4 text-sm">
                            {user && (
                                <>
                                    <LikeButton materialId={material.id} defaultLiked={material.likes.length > 0} likeId={material.likes.length > 0 ? material.likes[0].id : null} />
                                    <FavoriteButton materialId={material.id} defaultFavorited={material.favorites.length > 0} favoriteId={material.favorites.length > 0 ? material.favorites[0].id : null} />
                                </>
                            )}
                        </div>
                        <div>
                            <p className="text-lg">{material.description}</p>
                            <div>
                                {material.tags.map((tag) => (
                                    <Link key={tag.id} href={`/materials?keyword=%23${tag.name}`} className="text-main">#{tag.name}</Link>
                                ))}
                            </div>
                        </div>
                        <div className={reggaeOne.className}>
                            {permissionState === 'approved' && (
                                <DownloadButton id={id} name={material.name}>ダウンロード</DownloadButton>
                            )}
                            {permissionState === 'ready' && (
                                <>
                                    {user && (
                                        <>
                                            <PermissionRequestButton id={id}>クリエイターへ承認依頼する</PermissionRequestButton>
                                        </>
                                    )}
                                    {!user && <Button className="mt-8 w-full py-4 text-center" href="/login">ログインして承認依頼する</Button>}
                                    <p className="text-red-600 text-center">この素材はクリエイターへの承認依頼が必要です</p>
                                </>
                            )}
                            {permissionState === 'pending' && (
                                <Button className="mt-8 w-full py-4" disabled>クリエイターへの承認依頼中です</Button>
                            )}
                            {permissionState === 'disapproved' && (
                                <Button className="mt-8 w-full py-4" disabled>承認されませんでした</Button>
                            )}
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <ShareButtons />
                                {(user && user.status === 'active') && (
                                    <div className="p-4 text-center max-w-max">
                                        <ReportButton id={material.id} className="text-xs" style={{ padding: '.5rem' }}>不適切な素材として報告する</ReportButton>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/3 md:p-4">
                    <div className="bg-white shadow p-4">
                        <h2 className={clsx(["mb-4 text-center text-main text-2xl", reggaeOne.className])}>
                            ユーザー情報
                        </h2>
                        <div>
                            <RoundedImage src={material.user.image} alt={material.user.name} width={200} />
                            <p className={clsx(["text-center text-main text-xl", reggaeOne.className])}><Link href={'/users/' + material.user_id}>{material.user.name}</Link></p>
                            <p className="text-center mb-4">{material.user.role}</p>
                            <p className="text-center">{limitStringLengthWithEllipsis(material.user.description, 120)}</p>
                            {user && (
                                <div className="mt-4 text-center">
                                    <FollowButton userId={material.user.id} isFollowing={isFollowing} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-16">
                <CommentClient comments={comments} user={user} materialId={material.id} />
                {!user && (
                    <div className="border-2 border-main p-4 mx-auto w-max text-center">
                        <p>コメントを投稿するにはログインが必要です</p>
                        <Button className="mt-4 py-4" href="/login">ログインする</Button>
                    </div>
                )}
            </div>
            <div className="mt-16">
                <h2 className="mb-4">
                    <TextShadow className="text-xl">{material.user.name}さんの</TextShadow>
                    <TextShadow className="text-xl">その他の素材</TextShadow>
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {userMaterialsPagination.data.map((material) => (
                        <MaterialCard key={material.id} material={material} />
                    ))}
                </div>
            </div>
            <div className="mt-16">
                <h2 className="mb-4">
                    <TextShadow className="text-xl">同じカテゴリーの素材</TextShadow>
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {relatedMaterialsPagination.data.map((material) => (
                        <MaterialCard key={material.id} material={material} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MaterialDetail;