'use client'
import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import Button from "../components/atoms/Button";
import { redirect, useRouter } from "next/navigation";
import { csrf } from "../lib/csrf";
import { register } from "../lib/auth";
import Link from "next/link";
import Axios from "axios";
import { useState } from "react";
import ErrorMessage from "../components/atoms/Error";
import FormControl from "../components/Form/FormControl";

export default function RegisterPage() {
  const [errors, setErrors] = useState({} as any)
  const router = useRouter()

  const create = async (formData: FormData) => {
    const rawFormData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      password_confirmation: formData.get('password'),
    }

    await csrf();
    try {
      const res = await register(rawFormData);
      console.log(res.data)
      router.push('/user')
    } catch (e) {
      if (Axios.isAxiosError(e) && e.response) {
        const data = e.response.data
        setErrors(data.errors)
      }
    }
  }

  return (
      <Container>
        <h1><TextShadow className="text-xl">登録</TextShadow></h1>
        <div className="max-w-sm mx-auto mt-8">
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
              <Button className="py-4 px-16">ユーザー登録</Button>
            </div>
          </form>
        </div>
        <div className="text-center mt-8 text-main">
          <Link href="/login" className="underline">登録済みの方はこちら</Link>
        </div>
      </Container>
  );
}
