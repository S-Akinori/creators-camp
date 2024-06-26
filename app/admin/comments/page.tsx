import Container from "@/app/components/Container"
import AdminCommentsTableClient from "@/app/components/organisms/AdminCommentsTableClient"

const AdminCommentsPage = async () => {
    
    return (
        <Container>
            <h1>コメント一覧</h1>
            <AdminCommentsTableClient />
        </Container>
    )
}

export default AdminCommentsPage