import Button from "@/app/components/atoms/Button"
import Container from "@/app/components/Container"
import AdminUsersTableClient from "@/app/components/organisms/AdminUsersTableClient"
import NewsClient from "@/app/components/organisms/News/NewsClient"
import TextShadow from "@/app/components/TextShadow"
import Title from "@/app/components/Title"
import Link from "next/link"

const AdminUsersPage = async ({searchParams} : {searchParams: { [key: string]: string | undefined }}) => {
    
    return (
        <Container>
            <h1>ユーザー一覧</h1>
            <AdminUsersTableClient />
        </Container>
    )
}

export default AdminUsersPage