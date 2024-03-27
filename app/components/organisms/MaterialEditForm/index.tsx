'use client'
import { useState } from "react";
import Button from "../../atoms/Button";
import ErrorMessage from "../../atoms/Error";
import FormControl from "../../Form/FormControl";
import Input from "../../Form/Input";
import Label from "../../Form/Label";
import Select from "../../Form/Select";
import Textarea from "../../Form/Textarea";
import { Material, MaterialError } from "@/app/types/Material";
import { csrf } from "@/app/lib/csrf";
import { http } from "@/app/lib/http";
import Axios from "axios";
import { Category } from "@/app/types/Category";
import LoadingIcon from "../../atoms/Icons/LoadingIcons";
import Image from "next/image";
import Thumbnail from "../../atoms/Thumbnail";
import Modal from "../../molecules/Modal";

interface Props {
    categories: Category[]
    material: Material
}

const MaterialEditForm = ({ categories, material }: Props) => {
    const [errors, setErrors] = useState<MaterialError>({})
    const [formState, setFormState] = useState<'error' | 'success' | 'submitting' | 'ready'>('ready')
    const update = async (formData: FormData) => {
        setErrors({});
        setFormState('submitting');
        await csrf();
        try {
            const res = await http.post(`/materials/${material.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-HTTP-Method-Override': 'PUT'
                }
            });
            // setMaterial(res.data);
            setFormState('success');
        } catch (e) {
            if (Axios.isAxiosError(e) && e.response) {
                const data = e.response.data
                setErrors(data.errors);
            }
            setFormState('error');
        };
    }

    return (
        <>
            <Modal open={formState == 'success'} setOpen={(open) => setFormState(open ? 'success' : 'ready')}>
                <div className="text-center">
                    <p className="text-2xl font-bold mb-4">保存しました</p>
                    <Button className="mx-4 block" href={'/materials/' + material?.id}>保存した素材を確認</Button>
                </div>
            </Modal>
            <form action={update}>
                <FormControl flex={false}>
                    <Label htmlFor="file" className="shrink-0 mr-4">素材</Label>
                    <Input id="file" type="file" name="file" className="w-full" />
                    {errors.file && <ErrorMessage message={errors.file[0]} />}
                </FormControl>
                <FormControl flex={false}>
                    <Label htmlFor="name" className="shrink-0 mr-4">タイトル</Label>
                    <Input id="name" type="text" name="name" className="w-full" defaultValue={material.name} />
                    {errors.name && <ErrorMessage message={errors.name[0]} />}
                </FormControl>
                <FormControl flex={false}>
                    <Label htmlFor="description" className="shrink-0 mr-4">説明</Label>
                    <Textarea id="description" rows={5} name="description" className="w-full" defaultValue={material.description} />
                    {errors.description && <ErrorMessage message={errors.description[0]} />}
                </FormControl>
                <FormControl flex={false}>
                    <Label htmlFor="image" className="shrink-0 mr-4">スクリーンショット</Label>
                    <Input id="image" type="file" name="image" className="w-full" />
                    <div className="mt-4 border-main border-2">
                        <Thumbnail src={material.image} alt={material.name} />
                    </div>
                    {errors.image && <ErrorMessage message={errors.image[0]} />}
                </FormControl>
                <FormControl flex={false}>
                    <Label htmlFor="category_id" className="shrink-0 mr-4">カテゴリー</Label>
                    <Select id="category_id" name="category_id" className="w-full">
                        {categories && categories.map((cat) => (
                            <option key={cat.id} value={cat.id} selected={material.category_id === cat.id}>{cat.name}</option>
                        ))}
                    </Select>
                    {errors.category_id && <ErrorMessage message={errors.category_id[0]} />}
                </FormControl>
                <FormControl flex={false}>
                    <Label htmlFor="permission" className="shrink-0 mr-4">承認の有無</Label>
                    <Select id="permission" name="permission" className="w-full">
                        <option value="1" selected={material.permission == 1}>承認を必要にする</option>
                        <option value="0" selected={material.permission == 0}>承認を必要にしない</option>
                    </Select>
                    {errors.permission && <ErrorMessage message={errors.permission[0]} />}
                </FormControl>
                <div className="text-center mt-8">
                    <Button className="py-4 px-16" disabled={formState == 'submitting'}>{formState == 'submitting' ? <LoadingIcon /> : '保存'}</Button>
                </div>
            </form>
        </>
    )
}

export default MaterialEditForm;