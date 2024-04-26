'use client';
import Button from "@/app/components/atoms/Button";
import ErrorMessage from "@/app/components/atoms/Error";
import LoadingIcon from "@/app/components/atoms/Icons/LoadingIcons";
import Container from "@/app/components/Container";
import Input from "@/app/components/Form/Input";
import RichEditor from "@/app/components/organisms/RichEditor";
import { csrf } from "@/app/lib/csrf";
import { http } from "@/app/lib/http";
import Axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

const NewsCreatePage = () => {
    const [value, setValue] = useState('');
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const router = useRouter();

    const save = async (formData: FormData) => {
        setFormState('submitting');
        formData.append('content', value);
        await csrf();
        try {
            const res = await http.post('/news', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            router.push('/admin/news');
        } catch (e) {
            if (Axios.isAxiosError(e) && e.response) {
                const data = e.response.data
                setErrors(data.errors);
            }
            setFormState('error');
            setTimeout(() => {
                setFormState('idle');
            }, 3000);
        }
    }
    return (
        <Container>
            <div className="bg-white min-h-screen p-4">
                <form action={save}>
                    <div className="mb-4">
                        <Input placeholder="タイトル" name="title" className="w-full bg-white border-gray-400" />
                        {errors.title && <ErrorMessage message={errors.title[0]} /> }
                    </div>
                    <div className="mb-4">
                        <RichEditor value={value} setValue={setValue} />
                        {errors.content && <ErrorMessage message={errors.content[0]} /> }
                    </div>
                    <div className="mb-4">
                        <Input type="file" name="image" placeholder="サムネイル" className="w-full bg-white border-gray-400" />
                        {errors.image && <ErrorMessage message={errors.image[0]} />}
                    </div>
                    <div className="mb-4">
                        <Input placeholder="スラッグ" name="slug" className="w-full bg-white border-gray-400" />
                        {errors.slug && <ErrorMessage message={errors.slug[0]} />}
                    </div>
                    <div className="text-center">
                        <Button disabled={formState !== 'idle'}>
                            {formState === 'idle' && '保存'}
                            {formState === 'submitting' && <LoadingIcon />}
                            {formState === 'success' && '保存しました'}
                            {formState === 'error' && 'エラーが発生しました'}
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
    );
};
export default NewsCreatePage;