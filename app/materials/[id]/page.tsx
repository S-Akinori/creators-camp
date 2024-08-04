import Button from "@/app/components/atoms/Button";
import Container from "@/app/components/Container";
import TextShadow from "@/app/components/TextShadow";
import Image from "next/image";
import { getMaterials, getUserMaterials } from "@/app/lib/material";
import Thumbnail from "@/app/components/atoms/Thumbnail";
import UserCard from "@/app/components/organisms/UserCard";
import MaterialCard from "@/app/components/organisms/MaterialCard";
import { getCategory } from "@/app/lib/category";
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
import CommentForm from "@/app/components/organisms/CommentForm";
import { getComments } from "@/app/lib/server/comment";
import { toDateString } from "@/app/lib/functions/toDateString";
import FollowButton from "@/app/components/organisms/FollowButton";
import { getIsFollowing } from "@/app/lib/server/follow";

interface Props {
    params: {
        id: string;
    }
}

const checkPermissionState = (required: number, permission_tokens: PermissionToken[]) => {
    if (required == 0) return 'approved'
    else if (permission_tokens.length && permission_tokens[0].is_active == 1) return 'pending'
    else if (permission_tokens.length && permission_tokens[0].is_active == 0 && permission_tokens[0].is_approved == 0) return 'disapproved'
    else if (permission_tokens.length && permission_tokens[0].is_active == 0 && permission_tokens[0].is_approved == 1) return 'approved'
    else return 'ready'
}

const MaterialDetailPage = async ({ params }: Props) => {
    const user = await getUser()
    const material = await getMaterial(Number(params.id))
    const userMaterialsPagination = await getUserMaterials(material.user.id)
    const relatedMaterialsPagination = material.category_id > 0 ? await getMaterials({category_id: material.category_id}) : await getMaterials()
    const permissionState = user ? checkPermissionState(material.permission, material.permission_tokens) : 'ready'
    const fileType = identifyFileTypeByExtension(material.file)
    const comments = await getComments(material.id)
    const isFollowing = user ? await getIsFollowing(material.user.id) : false

    return (
        <Container>
            <div className="md:flex">
                <div className="md:w-1/2">
                    <div className="bg-white p-4 relative">
                        <h1 className={clsx(["text-main font-bold text-3xl mb-4", reggaeOne.className])}>{material.name}</h1>
                        {material.is_ai_generated && (
                            <div className="absolute top-4 right-4 rounded-full border-2 border-main text-main font-bold w-12 aspect-square text-center leading-tight">
                                AI<br/>
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
                                    <Link key={tag.id} href={`/materials?tag_id=${tag.id}`} className="text-main">#{tag.name}</Link>
                                ))}
                            </div>
                        </div>
                        <div className={reggaeOne.className}>
                            {permissionState === 'approved' && (
                                <DownloadButton id={params.id} name={material.name}>ダウンロード</DownloadButton>
                            )}
                            {permissionState === 'ready' && (
                                <>
                                    {user && <PermissionRequestButton id={params.id}>クリエイターへ承認依頼する</PermissionRequestButton>}
                                    {!user && <Button className="mt-8 w-full py-4 text-center" href="/login">ログインして承認依頼する</Button>}
                                    <p className="text-red-600">この素材はクリエイターへの承認依頼が必要です</p>
                                </>
                            )}
                            {permissionState === 'pending' && (
                                <Button className="mt-8 w-full py-4" disabled>クリエイターへの承認依頼中です</Button>
                            )}
                            {permissionState === 'disapproved' && (
                                <Button className="mt-8 w-full py-4" disabled>承認されませんでした</Button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 p-4">
                    <div className="bg-white p-4 h-full">
                        <h2 className={clsx(["mb-4 text-center text-main text-2xl", reggaeOne.className])}>
                            ユーザー情報
                        </h2>
                        <div>
                            <Image src={material.user.image} width={200} height={200} alt={material.user.name} className="rounded-full mb-4 mx-auto border-main border" />
                            <p className={clsx(["text-center text-main text-xl mb-4", reggaeOne.className])}><Link href={'/users/' + material.user_id}>{material.user.name}</Link></p>
                            <p className="text-center">{material.user.description}</p>
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
                <h2 className="mb-4">
                    <TextShadow className="text-xl">{material.user.name}さんの</TextShadow>
                    <TextShadow className="text-xl">その他の素材</TextShadow>
                </h2>
                <div className="flex flex-wrap">
                    {userMaterialsPagination.data.map((material) => (
                        <MaterialCard key={material.id} material={material} />
                    ))}
                </div>
            </div>
            <div className="mt-16">
                <h2 className="mb-4">
                    <TextShadow className="text-xl">同じカテゴリーの素材</TextShadow>
                </h2>
                <div className="flex flex-wrap">
                    {relatedMaterialsPagination.data.map((material) => (
                        <MaterialCard key={material.id} material={material} />
                    ))}
                </div>
            </div>
            <div className="mt-16">
                <h2 className="mb-4">
                    <TextShadow className="text-xl mb-4">この素材のコメント</TextShadow>
                </h2>
                {comments.data.length == 0 && <p className="text-center">コメントはまだありません</p>}
                {comments.data.length > 0 && comments.data.map((comment) => (
                    <div key={comment.id} className="bg-white border-b border-main p-4 mt-4">
                        <div className="mb-4">
                            <UserCard user={comment.user} />
                            <p>{toDateString(comment.created_at)}</p>
                        </div>
                        <p>{comment.content}</p>
                    </div>
                ))}
            </div>
            <div className="mt-16">
                {user && (
                    <div>
                        <h2 className="mb-4">
                            <TextShadow className="text-xl">コメントを投稿する</TextShadow>
                        </h2>
                        <CommentForm materialId={material.id} />
                    </div>
                )}
                {!user && (
                    <div className="border-2 border-main p-4 mx-auto w-max text-center">
                        <p>コメントを投稿するにはログインが必要です</p>
                        <Button className="mt-4 py-4" href="/login">ログインする</Button>
                    </div>
                )}
            </div>
        </Container>
    )
}

export default MaterialDetailPage;