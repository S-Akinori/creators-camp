'use client'
import { useState } from "react";
import FormControl from "../Form/FormControl";
import Input from "../Form/Input";
import Label from "../Form/Label";
import { User } from "@/app/types/User";
import ErrorMessage from "../atoms/Error";
import { csrf } from "@/app/lib/csrf";
import { http } from "@/app/lib/http";
import Button from "../atoms/Button";
import LoadingIcon from "../atoms/Icons/LoadingIcons";
import axios from "axios";

interface Props {
    user: User
}

const AdminUserUpdateForm = ({ user }: Props) => {
    const [errors, setErrors] = useState({} as any)
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle')

    const action = async (formData: FormData) => {
        setFormState('submitting')
        formData.append('_method', 'put');
        await csrf()
        try {
            await http.post(`/admin/users/${user.id}`, formData);
            setFormState('success')
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
        <form action={action}>
            <FormControl>
                <Label htmlFor="email" className="mr-4 w-28 shrink-0">メールアドレス</Label>
                <div className="w-full">
                    <Input id="email" name="email" type="email" className="w-full" defaultValue={user.email} />
                    {errors.email && <ErrorMessage message={errors.email[0]} />}
                </div>
            </FormControl>
            <FormControl>
                <Label htmlFor="password" className="mr-4 w-28 shrink-0">パスワード</Label>
                <div className="w-full">
                    <Input id="password" name="password" type="password" className="w-full" />
                    {errors.password && <ErrorMessage message={errors.password[0]} />}
                </div>
            </FormControl>
            <div className="text-center mt-8">
              <Button className="py-4 px-16" disabled={formState !== 'idle'}>
                {formState === 'idle' && '更新'}
                {formState === 'submitting' && <LoadingIcon />}
                {formState === 'error' && 'エラーが発生しました'}
                {formState === 'success' && '更新しました'}
              </Button>
            </div>
        </form>
    );
}

export default AdminUserUpdateForm;