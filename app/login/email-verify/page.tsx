import Container from "@/app/components/Container"
import EmailVerificationButton from "@/app/components/organisms/EmailVerificationButton"
import LogoutButton from "@/app/components/organisms/LogoutButton"
import TextShadow from "@/app/components/TextShadow"
import { getUser } from "@/app/lib/auth"

export default async function EmailVerifyPage() {
  const user = await getUser()

  return (
      <Container>
        <h1 className="mb-4"><TextShadow className="text-xl">メール認証</TextShadow></h1>
        <p className="text-center">{user?.name}さんのメールアドレス({user?.email})の認証が完了しておりません。下記ボタンをクリックし認証メールを受け取り認証を行ってください。</p>
        <div className="max-w-sm mx-auto mt-8">
          <div className="text-center"><EmailVerificationButton /></div>
          <div className="text-center mt-4"><LogoutButton /></div>
        </div>
      </Container>
  );
}
