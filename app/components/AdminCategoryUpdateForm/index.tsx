'use client'
import { useEffect, useState } from "react";
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
import { Material } from "@/app/types/Material";
import Select from "../Form/Select";
import { Category } from "@/app/types/Category";
import Textarea from "../Form/Textarea";
import Thumbnail from "../atoms/Thumbnail";
import useImagePreview from "@/app/lib/hooks/useImagePreview";

interface Props {
    category: Category
}

const AdminCategoryUpdateForm = ({ category }: Props) => {
    const [errors, setErrors] = useState({} as any)
    const { preview, handleImageChange } = useImagePreview(category.image);
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle')

    const action = async (formData: FormData) => {
        setFormState('submitting')
        formData.append('_method', 'put');
        await csrf()
        try {
            await http.post(`/categories/${category.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
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
                <Label htmlFor="name" className="mr-4 w-28 shrink-0">カテゴリー名</Label>
                <div className="w-full">
                    <Input id="name" name="name" type="name" className="w-full" defaultValue={category.name} />
                    {errors.name && <ErrorMessage message={errors.name[0]} />}
                </div>
            </FormControl>
            <FormControl>
                <Label htmlFor="description" className="w-28 shrink-0 mr-4">説明</Label>
                <Textarea id="description" rows={5} name="description" className="w-full">{category.description}</Textarea>
                {errors.description && <ErrorMessage message={errors.description[0]} />}
            </FormControl>
            <FormControl>
                <Label htmlFor="slug" className="mr-4 w-28 shrink-0">スラッグ</Label>
                <div className="w-full">
                    <Input id="slug" name="slug" className="w-full" defaultValue={category.slug} />
                    {errors.slug && <ErrorMessage message={errors.slug[0]} />}
                </div>
            </FormControl>
            <FormControl>
                <Label htmlFor="image" className="mr-4 w-28 shrink-0">アイコン</Label>
                <div className="w-full flex">
                    <div className="w-40">
                        {preview && (<Thumbnail objectFit="contain" src={preview} />)}
                    </div>
                    <Input id="image" name="image" type="file" accept="image/*" className="w-full" onChange={handleImageChange} />
                    {errors.image && <ErrorMessage message={errors.image[0]} />}
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

export default AdminCategoryUpdateForm;