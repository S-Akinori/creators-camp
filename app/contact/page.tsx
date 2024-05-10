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
import Textarea from "../components/Form/Textarea";

export default function ContactPage() {
  const [errors, setErrors] = useState({} as any)
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle')
  const router = useRouter()

  const action = async (formData: FormData) => {
    setFormState('submitting')
    await csrf()
    try {
      const res = await http.post('/contact', formData)
      setFormState('success')
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const data = e.response.data
        setErrors(data.errors)
        console.log(data)
      }
      setFormState('error')
      setTimeout(() => {
        setFormState('idle')
      }, 3000)
    }
  }

  return (
      <Container className="bg-white py-4">
        <h1><TextShadow className="text-xl">お問い合わせ</TextShadow></h1>
        <div className="max-w-3xl mx-auto mt-8">
          <form action={action}>
            <div>
              <FormControl>
                <Label htmlFor="name" className="mr-4 w-28 shrink-0">名前</Label>
                <div className="w-full">
                  <Input id="name" name="name" className="w-full" />
                  {errors.name && <ErrorMessage message={errors.name[0]} />}
                </div>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <Label htmlFor="email" className="mr-4 w-28 shrink-0">メールアドレス</Label>
                <div className="w-full">
                  <Input id="email" name="email" type="email" className="w-full" />
                  {errors.email && <ErrorMessage message={errors.email[0]} />}
                </div>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <Label htmlFor="content" className="mr-4 w-28 shrink-0">お問合わせ内容</Label>
                <div className="w-full">
                  <Textarea id='content' name='content' className='w-full' rows={5} />
                  {errors.content && <ErrorMessage message={errors.content[0]} />}
                </div>
              </FormControl>
            </div>
            <div className="text-center mt-8">
              <Button className="py-4 px-16" disabled={formState !== 'idle'}>
                {formState === 'idle' && '送信'}
                {formState === 'submitting' && <LoadingIcon />}
                {formState === 'error' && 'エラーが発生しました'}
                {formState === 'success' && '送信が完了しました'}
              </Button>
            </div>
            {formState === 'success' && (
              <div className="text-center mt-8 p-4 border-2 border-main">
                お問い合わせを受け付けました。お問い合わせの内容を確認の上ご返信させていただきます。
              </div>
            )}
          </form>
        </div>
      </Container>
  );
}
