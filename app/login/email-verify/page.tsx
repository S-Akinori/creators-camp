import Button from "@/app/components/atoms/Button"
import ErrorMessage from "@/app/components/atoms/Error"
import LoadingIcon from "@/app/components/atoms/Icons/LoadingIcons"
import Container from "@/app/components/Container"
import Input from "@/app/components/Form/Input"
import Label from "@/app/components/Form/Label"
import EmailVerificationButton from "@/app/components/organisms/EmailVerificationButton"
import TextShadow from "@/app/components/TextShadow"
import { getUser } from "@/app/lib/auth"
import { csrf } from "@/app/lib/csrf"
import { http } from "@/app/lib/http"
import { FormControl } from "@mui/material"
import Axios from "axios"
import { useState } from "react"

export default async function EmailVerifyPage() {
  const user = await getUser()

  return (
      <Container>
        <h1 className="mb-4"><TextShadow className="text-xl">メール認証</TextShadow></h1>
        <p className="text-center">{user.name}さんのメールアドレス({user.email})の認証が完了しておりません。下記ボタンをクリックし認証メールを受け取り認証を行ってください。</p>
        <div className="max-w-sm mx-auto mt-8 text-center">
          <EmailVerificationButton />
        </div>
      </Container>
  );
}
