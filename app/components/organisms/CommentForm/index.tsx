'use client'
import { useEffect, useState } from "react";
import { csrf } from "@/app/lib/csrf";
import { http } from "@/app/lib/http";
import axios from "axios";
import { Material } from "@/app/types/Material";
import { Category } from "@/app/types/Category";
import FormControl from "../../Form/FormControl";
import Textarea from "../../Form/Textarea";
import ErrorMessage from "../../atoms/Error";
import Button from "../../atoms/Button";
import LoadingIcon from "../../atoms/Icons/LoadingIcons";

interface Props {
    materialId: number|string
}

const CommentForm = ({materialId}: Props) => {
    const [errors, setErrors] = useState({} as any)
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle')

    const action = async (formData: FormData) => {
        setFormState('submitting')
        formData.append('status', 'active');
        formData.append('material_id', materialId.toString());
        await csrf()
        try {
            await http.post(`/comments`, formData);
            setFormState('success')
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                const data = e.response.data
                setErrors(data.errors)
                console.log(data)
            }
            setFormState('error')
        }
    }

    return (
        <form action={action}>
            <FormControl>
                <div className="w-full">
                    <Textarea id="content" name="content" rows={5} className="w-full" />
                    {errors.content && <ErrorMessage message={errors.content[0]} />}
                </div>
            </FormControl>
            <div className="text-center mt-4">
                <Button className="py-2 px-16" disabled={formState !== 'idle'}>
                    {formState === 'idle' && '送信'}
                    {formState === 'submitting' && <LoadingIcon />}
                    {formState === 'error' && 'エラーが発生しました'}
                    {formState === 'success' && '送信しました'}
                </Button>
            </div>
        </form>
    );
}

export default CommentForm;