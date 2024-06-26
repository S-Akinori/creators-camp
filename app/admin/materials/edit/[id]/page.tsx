import AdminMaterialUpdateForm from "@/app/components/AdminMaterialUpdateForm"
import AdminUserUpdateForm from "@/app/components/AdminUserUpdateForm"
import Button from "@/app/components/atoms/Button"
import ErrorMessage from "@/app/components/atoms/Error"
import Thumbnail from "@/app/components/atoms/Thumbnail"
import Container from "@/app/components/Container"
import FormControl from "@/app/components/Form/FormControl"
import Input from "@/app/components/Form/Input"
import Label from "@/app/components/Form/Label"
import AdminUsersTableClient from "@/app/components/organisms/AdminUsersTableClient"
import NewsClient from "@/app/components/organisms/News/NewsClient"
import TextShadow from "@/app/components/TextShadow"
import Title from "@/app/components/Title"
import { http } from "@/app/lib/http"
import { identifyFileTypeByExtension } from "@/app/lib/identifyFileTypeByExtension"
import { getMaterial } from "@/app/lib/server/material"
import { getUser } from "@/app/lib/server/user"
import Link from "next/link"

interface Props {
    params: {
        id: string;
    }
}

const AdminMaterialsEditPage = async ({ params }: Props) => {
    const material = await getMaterial(Number(params.id))
    // const res = await http.get(`/materials/${material.id}/download`, {
    //     responseType: 'blob'
    // });
    // const blob = new Blob([res.data], { type: res.data.type });
    // const previewURL = URL.createObjectURL(blob)
    // const fileType = identifyFileTypeByExtension(material.file)
    return (
        <Container>
            <h1>素材情報更新</h1>
            <p>素材ID: {material.id}</p>
            <p>素材名：{material.name}</p>
            {/* {(fileType == 'image') && (
                <div className="mt-4">
                    <Thumbnail src={previewURL} />
                </div>
            )}
            {(fileType == 'video') && (
                <video className="w-full aspect-video mt-4" src={previewURL} controls />
            )}
            {(fileType == 'music') && (
                <audio className="w-full mt-4" src={previewURL} controls />
            )} */}
            <div className="mt-4">
                <AdminMaterialUpdateForm material={material} />
            </div>
        </Container>
    )
}

export default AdminMaterialsEditPage