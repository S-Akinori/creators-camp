import Button from "@/app/components/atoms/Button"
import Container from "@/app/components/Container"
import AdminCategoriesTableClient from "@/app/components/organisms/AdminCategoriesTableClient"
import AdminMaterialsTableClient from "@/app/components/organisms/AdminMaterialsTableClient"
import AdminUsersTableClient from "@/app/components/organisms/AdminUsersTableClient"
import NewsClient from "@/app/components/organisms/News/NewsClient"
import TextShadow from "@/app/components/TextShadow"
import Title from "@/app/components/Title"
import Link from "next/link"

const AdminCategoriesPage = async () => {
    
    return (
        <Container>
            <h1>カテゴリー一覧</h1>
            <AdminCategoriesTableClient />
        </Container>
    )
}

export default AdminCategoriesPage