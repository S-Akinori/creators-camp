import Button from "@/app/components/atoms/Button"
import Container from "@/app/components/Container"
import NewsClient from "@/app/components/organisms/News/NewsClient"
import TextShadow from "@/app/components/TextShadow"
import Title from "@/app/components/Title"
import Link from "next/link"

const AdminNewsPage = async () => {
    
    return (
        <Container>
            <h1>お知らせ一覧</h1>
            <div className="mb-4">
                <Button href='/admin/news/create'>ニュース作成</Button>
            </div>
            <NewsClient />
        </Container>
    )
}

export default AdminNewsPage