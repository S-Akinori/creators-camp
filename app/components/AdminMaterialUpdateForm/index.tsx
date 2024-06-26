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

interface Props {
    material: Material
}

const AdminMaterialUpdateForm = ({ material }: Props) => {
    const [errors, setErrors] = useState({} as any)
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle')
    const [categories, setCategories] = useState<Category[]>([])

    const action = async (formData: FormData) => {
        setFormState('submitting')
        formData.append('_method', 'put');
        await csrf()
        try {
            await http.post(`/admin/materials/${material.id}`, formData);
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

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await http.get('/categories')
            setCategories(data)
        }
        fetchCategories()
    }, [])

    return (
        <form action={action}>
            <FormControl>
                <Label htmlFor="name" className="mr-4 w-28 shrink-0">素材名</Label>
                <div className="w-full">
                    <Input id="name" name="name" type="name" className="w-full" defaultValue={material.name} />
                    {errors.name && <ErrorMessage message={errors.name[0]} />}
                </div>
            </FormControl>
            <FormControl>
                <Label htmlFor="description" className="w-28 shrink-0 mr-4">説明</Label>
                <Textarea id="description" rows={5} name="description" className="w-full">{material?.description}</Textarea>
                {errors.description && <ErrorMessage message={errors.description[0]} />}
            </FormControl>
            <FormControl>
                <Label htmlFor="category_id" className="mr-4 w-28 shrink-0">カテゴリー</Label>
                <Select id="category_id" name="category_id" className="w-full" defaultValue={material?.category_id}>
                    {categories && categories.map((cat) => (
                        <option key={cat.id} value={cat.id} selected={cat.id == material.category_id}>{cat.name}</option>
                    ))}
                </Select>
                {errors.category_id && <ErrorMessage message={errors.category_id[0]} />}
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

export default AdminMaterialUpdateForm;