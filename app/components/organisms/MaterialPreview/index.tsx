import Button from "@/app/components/atoms/Button";
import Image from "next/image";
import { getMaterials, getUserMaterials } from "@/app/lib/material";
import Thumbnail from "@/app/components/atoms/Thumbnail";
import { PermissionToken } from "@/app/types/PermissionToken";
import clsx from "clsx";
import { reggaeOne } from "@/app/fonts";
import { getUser } from "@/app/lib/auth";
import MaterialDeleteButton from "@/app/components/organisms/MaterialDeleteButton";
import { identifyFileTypeByExtension } from "@/app/lib/identifyFileTypeByExtension";
import PreviewButton from "@/app/components/organisms/PreviewButton";
import Link from "next/link";
import ShareButtons from "@/app/components/organisms/ShareButtons";
import { limitStringLengthWithEllipsis } from "@/app/lib/functions/limitStringLengthWithEllipsis";
import { Material } from "@/app/types/Material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RoundedImage from "../../molecules/RoundedImage";



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

const MaterialPreview = async ({id, material}: Props) => {
    const user = await getUser()
    // const material = await getMaterial(id)
    const permissionState = user ? checkPermissionState(material.permission, material.permission_tokens) : 'ready'
    const fileType = identifyFileTypeByExtension(material.file)
    
    return (
        <>
            <div className="md:flex">
                <div className="md:w-2/3">
                    <div className="bg-white shadow p-4 relative">
                        <div className="text-center p-4 underline">※こちらはプレビュー画面です</div>
                        <h1 className={clsx(["text-main font-bold text-3xl mb-4", reggaeOne.className])}>{material.name}</h1>
                        {(material.is_ai_generated == 1) && (
                            <div className="absolute top-4 right-4 rounded-full border-2 border-main text-main font-bold w-12 aspect-square text-center leading-tight">
                                AI<br />
                                利用
                            </div>
                        )}
                        <div className="md:flex">
                            <Button href={`/user/material/edit/${material.id}`} className={clsx([reggaeOne.className, 'mb-4 mx-2'])}>素材を編集する</Button>
                            <MaterialDeleteButton material={material} />
                        </div>
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
                                    <Button color='main-cont' className="mx-2 mb-4">いいね！ <ThumbUpOffAltIcon className="fill-main" /></Button>
                                    <Button color='accent-cont' className="mx-2 mb-4">お気に入り！ <StarBorderIcon className='fill-accent' /></Button>
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
                                <Button className="mt-8 w-full py-4">ダウンロード</Button>
                            )}
                            {permissionState === 'ready' && (
                                <>
                                    {user && (
                                        <>
                                            <Button className="mt-8 w-full py-4">クリエイターへ承認依頼する</Button>
                                        </>
                                    )}
                                    <p className="text-red-600 text-center">この素材はクリエイターへの承認依頼が必要です</p>
                                </>
                            )}
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <ShareButtons />
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
                                    <Button color="main-cont">フォローする</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MaterialPreview;