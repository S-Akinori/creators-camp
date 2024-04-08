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


export default function Login({searchParams} : {searchParams: { [key: string]: string | string[] | undefined }}) {
  const [errors, setErrors] = useState({} as any)
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle')
  const email = searchParams.email as string
  const token = searchParams.token as string
  const router = useRouter()

  const action = async (formData: FormData) => {
    setFormState('submitting')

    await csrf()
    formData.append('token', token)
    try {
      const res = await http.post('/reset-password', formData)
      setFormState('success')
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const data = e.response.data
        setErrors(data.errors)
      }
      setFormState('error')
      setTimeout(() => {
        setFormState('idle')
      }, 3000)
    }
  }

  return (
      <Container>
        <h1><TextShadow className="text-xl">パスワードリセット</TextShadow></h1>
        <div className="max-w-sm mx-auto mt-8">
          <form action={action}>
            <div>
              <FormControl>
                <Label htmlFor="email" className="mr-4 w-28 shrink-0">メールアドレス</Label>
                <div>
                  <Input id="email" name="email" type="email" className="w-full" defaultValue={email} />
                  {errors.email && <ErrorMessage message={errors.email[0]} />}
                </div>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <Label htmlFor="password" className="mr-4 w-28 shrink-0">パスワード</Label>
                <div>
                  <Input id="password" name="password" type="password" className="w-full" />
                  {errors.password && <ErrorMessage message={errors.password[0]} />}
                </div>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <Label htmlFor="password_confirmation" className="mr-4 w-28 shrink-0">パスワード確認</Label>
                <div>
                  <Input id="password_confirmation" name="password_confirmation" type="password_confirmation" className="w-full" />
                  {errors.password && <ErrorMessage message={errors.password_confirmation[0]} />}
                </div>
              </FormControl>
            </div>
            <div className="text-center mt-8">
              <Button className="py-4 px-16" disabled={formState !== 'idle'}>
                {formState === 'idle' && '送信'}
                {formState === 'submitting' && <LoadingIcon />}
                {formState === 'error' && 'エラーが発生しました'}
                {formState === 'success' && 'パスワードをリセットしました'}
              </Button>
            </div>
          </form>
        </div>
      </Container>
  );
}
