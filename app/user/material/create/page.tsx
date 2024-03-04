'use client'
import Image from "next/image";
import Container from "@/app/components/Container";
import TextShadow from "@/app/components/TextShadow";
import Input from "@/app/components/Form/Input";
import FormControl from "@/app/components/Form/FormControl";
import Label from "@/app/components/Form/Label";
import Textarea from "@/app/components/Form/Textarea";
import Select from "@/app/components/Form/Select";
import Button from "@/app/components/atoms/Button";
import useFetchUser from "@/app/lib/hooks/useFetchUser";
import { categories } from "@/contents/categories";
import { csrf } from "@/app/lib/csrf";
import { http } from "@/app/lib/http";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Material, MaterialError } from "@/app/types/Material";
import { Category } from "@/app/types/Category";
import ErrorMessage from "@/app/components/atoms/Error";
import LoadingIcon from "@/app/components/atoms/Icons/LoadingIcons";
import Modal from "@/app/components/molecules/Modal";
import Link from "next/link";



const UserMaterialCreatePage = () => {
    const [errors, setErrors] = useState<MaterialError>({})
    const [formState, setFormState] = useState<'error'|'success'|'submitting'|'ready'>('ready')
    const [categories, setCategories] = useState<Category[] | null>(null)
    const [material, setMaterial] = useState<Material | null>(null)
    const user = useFetchUser();

    const storeMaterial = async (formData: FormData) => {
        setErrors({});
        setFormState('submitting');
        await csrf();
        try {
            const res = await http.post('/materials', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data)
            setMaterial(res.data);
            setFormState('success');
        } catch (e) {
            if (Axios.isAxiosError(e) && e.response) {
                const data = e.response.data
                console.log(data);
                setErrors(data.errors);
            }
            setFormState('error');
        };
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await http.get('/categories');
            setCategories(res.data);
        }
        fetchCategories();
    }, []);

    return (
        <main className="min-h-screen">
            <Modal open={formState == 'success'} setOpen={(open) => setFormState(open ? 'success' : 'ready')}>
                <div className="text-center">
                    <p className="text-2xl font-bold mb-4">アップロード完了</p>
                    <Button className="mx-4"><a href='/user/material/create'>続けて素材をアップする</a></Button>
                    <Button className="mx-4"><Link href={'/materials/' + material?.id}>アップした素材を見る</Link></Button>
                </div>
            </Modal>
            <Container>
                <div>
                    <h1 className="text-2xl text-main font-bold text-center">素材アップロード</h1>
                </div>
                <div className="mt-8 mx-auto max-w-lg">
                    <form action={storeMaterial}>
                        <FormControl flex={false}>
                            <Label htmlFor="file" className="shrink-0 mr-4">素材</Label>
                            <Input id="file" type="file" name="file" className="w-full" />
                            {errors.file && <ErrorMessage message={errors.file[0]} />}
                        </FormControl>
                        <FormControl flex={false}>
                            <Label htmlFor="name" className="shrink-0 mr-4">タイトル</Label>
                            <Input id="name" type="text" name="name" className="w-full" />
                            {errors.name && <ErrorMessage message={errors.name[0]} />}
                        </FormControl>
                        <FormControl flex={false}>
                            <Label htmlFor="description" className="shrink-0 mr-4">説明</Label>
                            <Textarea id="description" rows={5} name="description" className="w-full" />
                            {errors.description && <ErrorMessage message={errors.description[0]} />}
                        </FormControl>
                        <FormControl flex={false}>
                            <Label htmlFor="image" className="shrink-0 mr-4">スクリーンショット</Label>
                            <Input id="image" type="file" name="image" className="w-full" />
                            {errors.image && <ErrorMessage message={errors.image[0]} />}
                        </FormControl>
                        <FormControl flex={false}>
                            <Label htmlFor="category_id" className="shrink-0 mr-4">カテゴリー</Label>
                            <Select id="category_id" name="category_id" className="w-full">
                                {categories && categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </Select>
                            {errors.category_id && <ErrorMessage message={errors.category_id[0]} />}
                        </FormControl>
                        <FormControl flex={false}>
                            <Label htmlFor="permission" className="shrink-0 mr-4">承認の有無</Label>
                            <Select id="permission" name="permission" className="w-full">
                                <option value="1">承認を必要にする</option>
                                <option value="0">承認を必要にしない</option>
                            </Select>
                            {errors.permission && <ErrorMessage message={errors.permission[0]} />}
                        </FormControl>
                        <div className="text-center mt-8">
                            <Button className="py-4 px-16" disabled={formState == 'submitting'}>{formState == 'submitting' ? <LoadingIcon /> : 'アップロード'}</Button>
                        </div>
                    </form>
                </div>
            </Container>
        </main>
    );
};

export default UserMaterialCreatePage;