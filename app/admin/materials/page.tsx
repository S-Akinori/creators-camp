import Button from "@/app/components/atoms/Button"
import Container from "@/app/components/Container"
import AdminMaterialsTableClient from "@/app/components/organisms/AdminMaterialsTableClient"
import AdminUsersTableClient from "@/app/components/organisms/AdminUsersTableClient"
import NewsClient from "@/app/components/organisms/News/NewsClient"
import TextShadow from "@/app/components/TextShadow"
import Title from "@/app/components/Title"
import Link from "next/link"

const AdminMaterialsPage = async () => {
    
    return (
        <Container>
            <h1>素材一覧</h1>
            <AdminMaterialsTableClient />
        </Container>
    )
}

export default AdminMaterialsPage