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

export default function Login() {
  const [errors, setErrors] = useState({} as any)
  const router = useRouter()

  const action = async (formData: FormData) => {
    const rawFormData = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    await csrf()
    try {
      const res = await login(rawFormData)
      const userRes = await http.get('/user')
      console.log(res)
      console.log(userRes.data)
      router.push('/user')
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const data = e.response.data
        setErrors(data.errors)
        console.log(data)
      }
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
              <Button className="py-4 px-16">ログイン</Button>
            </div>
          </form>
          <div className="text-center mt-8 text-main">
            <Link href="/register" className="underline">新規登録はこちら</Link>
          </div>
        </div>
      </Container>
  );
}
