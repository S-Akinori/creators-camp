'use client'
import Image from "next/image"
import FormControl from "../../Form/FormControl"
import Label from "../../Form/Label"
import Input from "../../Form/Input"
import { User } from "@/app/types/User"
import Textarea from "../../Form/Textarea"
import { update } from "@/app/lib/server/auth"
import { csrf } from "@/app/lib/csrf"
import { http } from "@/app/lib/http"
import useFormSubmit from "@/app/lib/hooks/useFormSubmit"
import LoadingIcon from "../../atoms/Icons/LoadingIcons"
import ErrorMessage from "../../atoms/Error"
import SuccessMessage from "../../atoms/Message"
import { useState } from "react"


const PasswordUpdateForm = () => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle')
    const update = async (formData: FormData) => {
        setFormState('submitting')
        const data = Object.fromEntries(formData.entries())
        await csrf()
        try {
            const res = await http.put('/user/password', data)
            setFormState('success')
            return res.data
        } catch (e) {
            console.error(e)
            setFormState('error')
        } finally {
            setTimeout(() => setFormState('idle'), 3000)
        }
    }
    return (
        <form action={update}>
            <FormControl flex={false}>
                <Label htmlFor="password" className="shrink-0 mr-4">現在のパスワード</Label>
                <Input id="current_password" name="current_password" type="password" className="w-full" />
            </FormControl>
            <FormControl flex={false}>
                <Label htmlFor="password" className="shrink-0 mr-4">新しいパスワード</Label>
                <Input id="password" name="password" type="password" className="w-full" />
            </FormControl>
            <div className="text-center mt-8">
                <button type="submit" className="py-4 px-16 bg-main text-white rounded-full" disabled={formState === 'submitting'}>
                    {formState === 'idle' && '保存'}
                    {formState === 'submitting' && <LoadingIcon />}
                    {formState === 'success' && '保存しました'}
                    {formState === 'error' && 'エラーが発生しました'}
                </button>
            </div>
        </form>
    )
}

export default PasswordUpdateForm