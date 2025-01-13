
import Container from "@/app/components/Container";
import Image from "next/image";
import Thumbnail from "@/app/components/atoms/Thumbnail";
import { getMaterial } from "@/app/lib/server/material";
import { http } from "@/app/lib/http";
import { cookies } from "next/headers";
import AcceptButton from "@/app/components/organisms/AcceptButton";
import clsx from "clsx";
import { reggaeOne } from "@/app/fonts";

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
                    <div>
                        <AcceptButton id={params.permissionId} is_approved={1} token={token}>承認する</AcceptButton>
                        <AcceptButton id={params.permissionId} is_approved={0} token={token}>承認しない</AcceptButton>
                    </div>
                </div>
                <div className="md:w-1/2 p-4">
                    <div className="bg-white p-4 h-full">
                        <h2 className={clsx(["mb-4 text-center text-main text-2xl"])}>
                            こちらのユーザーから承認依頼が届いています
                        </h2>
                        <div>
                            <Image src={user.image} width={200} height={200} alt={user.name} className="rounded-full mx-auto border-main border" />
                            <p className="text-center text-main text-xl">{user.name}</p>
                            <p className="text-center">{user.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default MaterialDetailPage;