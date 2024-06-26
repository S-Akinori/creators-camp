import AdminUserUpdateForm from "@/app/components/AdminUserUpdateForm"
import Button from "@/app/components/atoms/Button"
import ErrorMessage from "@/app/components/atoms/Error"
import Container from "@/app/components/Container"
import FormControl from "@/app/components/Form/FormControl"
import Input from "@/app/components/Form/Input"
import Label from "@/app/components/Form/Label"
import AdminUsersTableClient from "@/app/components/organisms/AdminUsersTableClient"
import NewsClient from "@/app/components/organisms/News/NewsClient"
import TextShadow from "@/app/components/TextShadow"
import Title from "@/app/components/Title"
import { getUser } from "@/app/lib/server/user"
import Link from "next/link"

interface Props {
    params: {
        id: string;
    }
}

const AdminUsersEditPage = async ({ params }: Props) => {
    const user = await getUser(Number(params.id))
    return (
        <Container>
            <h1>ユーザー情報更新</h1>
            <p>ユーザーID: {user.id}</p>
            <p>ユーザー名：{user.name}</p>
            <div className="mt-4">
                <AdminUserUpdateForm user={user} />
            </div>
        </Container>
    )
}

export default AdminUsersEditPage