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

export default function Login() {
  const [errors, setErrors] = useState({} as any)
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle')

  const action = async (formData: FormData) => {
    setFormState('submitting')

    await csrf()
    try {
      const res = await http.post('/forgot-password', formData)
      setFormState('success') 
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
                <Label htmlFor="email" className="mr-4 w-28 shrink-0">登録したメールアドレス</Label>
                <div>
                  <Input id="email" name="email" type="email" className="w-full" />
                  {errors.email && <ErrorMessage message={errors.email[0]} />}
                </div>
              </FormControl>
            </div>
            <div className="text-center mt-8">
              <Button className="py-4 px-16" disabled={formState !== 'idle'}>
                {formState === 'idle' && 'リセットメールを受け取る'}
                {formState === 'submitting' && <LoadingIcon />}
                {formState === 'error' && 'エラーが発生しました'}
                {formState === 'success' && 'メールを送信しました'}
              </Button>
            </div>
          </form>
        </div>
      </Container>
  );
}
