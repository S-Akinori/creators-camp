'use client'
import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import Button from "../components/atoms/Button";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { csrf } from "../lib/csrf";
import FormControl from "../components/Form/FormControl";
import ErrorMessage from "../components/atoms/Error";
import { login } from "../lib/authClient";
import { http } from "../lib/http";
import LoadingIcon from "../components/atoms/Icons/LoadingIcons";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import SNSLoginButtons from "../components/organisms/SNSLoginButtons";

export default function Login() {
  const [errors, setErrors] = useState({} as any)
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle')
  const router = useRouter()

  const action = async (formData: FormData) => {
    setFormState('submitting')
    const rawFormData = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    await csrf()
    try {
      const res = await login(rawFormData)
      const userRes = await http.get('/user')
      if(userRes.data.role === 'admin') {
        window.location.href = '/admin'
      } else {
        window.location.href = '/user'
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const data = e.response.data
        setErrors(data.errors)
        console.log(data)
      }
      setFormState('error')
    } finally {
      setTimeout(() => {
        setFormState('idle')
      }, 3000)
    }
  }

  return (
      <Container>
        <h1><TextShadow className="text-xl">ログイン</TextShadow></h1>
        <div className="max-w-sm mx-auto mt-8">
          <form action={action}>
            <div>
              <FormControl>
                <Label htmlFor="email" className="mr-4 w-28 shrink-0">メールアドレス</Label>
                <div>
                  <Input id="email" name="email" type="email" className="w-full" />
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
              <Button className="py-4 px-16">
                {formState === 'idle' && 'ログイン'}
                {formState === 'submitting' && <LoadingIcon />}
                {formState === 'error' && 'エラーが発生しました'}
                {formState === 'success' && 'ログインしました'}
              </Button>
            </div>
          </form>
          <div className="text-center mt-8 text-main">
            <Link href="/forgot-password" className="underline">パスワードを忘れた方はこちら</Link>
          </div>
          <div className="text-center mt-8 text-main">
            <Link href="/register" className="underline">新規登録はこちら</Link>
          </div>
          <SNSLoginButtons />
        </div>
      </Container>
  );
}
