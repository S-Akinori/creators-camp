
import Container from "@/app/components/Container";
import Image from "next/image";
import Thumbnail from "@/app/components/atoms/Thumbnail";
import { getMaterial } from "@/app/lib/server/material";
import { http } from "@/app/lib/http";
import { cookies } from "next/headers";
import AcceptButton from "@/app/components/organisms/AcceptButton";
import clsx from "clsx";
import { reggaeOne } from "@/app/fonts";
import RoundedImage from "@/app/components/molecules/RoundedImage";
import { limitStringLengthWithEllipsis } from "@/app/lib/functions/limitStringLengthWithEllipsis";
import FollowButton from "@/app/components/organisms/FollowButton";
import Link from "next/link";
import Button from "@/app/components/atoms/Button";

interface Props {
    params: {
        id: string;
        permissionId: string;
    },
    searchParams: { [key: string]: string | string[] | undefined };
}

const MaterialDetailPage = async ({params, searchParams}: Props) => {
    const material = await getMaterial(Number(params.id))
    const permissionTokenRes = await http.get(`/permission_tokens/${params.permissionId}`,
        {
            params: searchParams,
            headers: {
                referer: process.env.APP_URL,
                Cookie: `re_creators_camp_session=${cookies().get("re_creators_camp_session")?.value}`,
            },
        })
    const permissionToken = permissionTokenRes.data
    const userRes = await http.get(`/users/${permissionToken.user_id}`)
    const user = userRes.data
    const token = searchParams.token as string

    console.log(permissionToken)

    return (
        <Container>
            <div className="md:flex">
                <div className="md:w-1/2">
                    <h1 className={clsx(["text-main font-bold text-3xl mb-4", reggaeOne.className])}>{material.name}</h1>
                    <div className="border-main border-2">
                        <Thumbnail src={material.image} alt={material.name} />
                    </div>
                    <div>
                        <p>{material.description}</p>
                    </div>
                    {permissionToken.is_active == 1 && (
                        <div>
                            <AcceptButton id={params.permissionId} is_approved={1} token={token}>承認する</AcceptButton>
                            <AcceptButton id={params.permissionId} is_approved={0} token={token}>承認しない</AcceptButton>
                        </div>
                    )}
                    {permissionToken.is_active == 0 && (
                        <div>
                            <Button className="mt-8 w-full py-4" disabled>{permissionToken.is_approved == 1 ? '承認しました' : '承認依頼を却下しました'}</Button>
                        </div>
                    )}
                </div>
                <div className="md:w-1/2 p-4">
                    <div className="bg-white p-4 h-full">
                        <h2 className={clsx(["mb-4 text-center text-main text-2xl"])}>
                            こちらのユーザーから承認依頼が届いています
                        </h2>
                        <div>
                            <RoundedImage src={user.image} alt={user.name} width={200} />
                            <p className={clsx(["text-center text-main text-xl", reggaeOne.className])}><Link href={'/users/' + user.id}>{user.name}</Link></p>
                            <p className="text-center mb-4">{user.role}</p>
                            <p className="text-center">{limitStringLengthWithEllipsis(user.description, 120)}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default MaterialDetailPage;