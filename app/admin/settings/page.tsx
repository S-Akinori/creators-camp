import Container from "@/app/components/Container"
import PasswordUpdateForm from "@/app/components/organisms/PasswordUpdateForm"
import TextShadow from "@/app/components/TextShadow"

const AdminSettingsPage = () => {
    return (
        <Container>
            <h1><TextShadow className="text-2xl">管理者設定</TextShadow></h1>
            <div>
                <h2 className="text-2xl font-bold text-main mb-4">パスワード変更</h2>
                <PasswordUpdateForm />
            </div>
        </Container>
    )
}
export default AdminSettingsPage