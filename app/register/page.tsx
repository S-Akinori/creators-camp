'use client'
import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import Button from "../components/atoms/Button";
import { redirect, useRouter } from "next/navigation";
import { csrf } from "../lib/csrf";
import Link from "next/link";
import Axios from "axios";
import { useState } from "react";
import ErrorMessage from "../components/atoms/Error";
import FormControl from "../components/Form/FormControl";
import LoadingIcon from "../components/atoms/Icons/LoadingIcons";
import { register } from "../lib/authClient";
import SNSLoginButtons from "../components/organisms/SNSLoginButtons";

export default function RegisterPage() {
  const [state, setState] = useState<'ready' | 'submitting' | 'error' | 'success'>('ready')
  const [errors, setErrors] = useState({} as any)
  const router = useRouter()

  const create = async (formData: FormData) => {
    setState('submitting')
    const rawFormData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      password_confirmation: formData.get('password'),
    }

    await csrf();
    try {
      const res = await register(rawFormData);
      setState('success')
    } catch (e) {
      if (Axios.isAxiosError(e) && e.response) {
        const data = e.response.data
        setErrors(data.errors)
      }
      setState('error')
      setTimeout(() => {
        setState('ready')
      }, 3000)
    }
  }

  return (
      <Container>
        <h1><TextShadow className="text-xl">登録</TextShadow></h1>
        <div className="max-w-sm mx-auto mt-8 bg-white shadow p-4">
          <form action={create}>
            <div>
              <FormControl>
                <Label htmlFor="name" className="mr-4 w-28 shrink-0">名前</Label>
                <div>
                  <Input id="name" name="name" className="w-full" />
                  {errors.name && <ErrorMessage message={errors.name[0]} />}
                </div>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <Label htmlFor="email" className="mr-4 w-28 shrink-0">メールアドレス</Label>
                <div>
                  <Input id="email" name="email" className="w-full" />
                  {errors.email && <ErrorMessage message={errors.email[0]} />}
                </div>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <Label htmlFor="passward" className="mr-4 w-28 shrink-0">パスワード</Label>
                <div>
                  <Input id="passward" name="password" type="password" className="w-full" />
                  {errors.password && <ErrorMessage message={errors.password[0]} />}
                </div>
              </FormControl>
            </div>
            <div className="text-center mt-8">
              <Button className="py-4 px-16" disabled={state !== 'ready'}>
                {state === 'ready' && 'ユーザー登録'}
                {state === 'submitting' && <LoadingIcon />}
                {state === 'success' && '登録完了'}
                {state === 'error' && 'エラーが発生しました'}
              </Button>
            </div>
          </form>
          {state === 'success' && (
            <div className="p-4 mt-4 border-2 border-main">
              入力したメールアドレス宛てに認証メールを送信しました。メール内のリンクをクリックして登録を完了してください。
            </div>
          )}
          <SNSLoginButtons />
        </div>
        <div className="text-center mt-8 text-main">
          <Link href="/login" className="underline">登録済みの方はこちら</Link>
        </div>
      </Container>
  );
}
