'use client';
import Button from "@/app/components/atoms/Button";
import ErrorMessage from "@/app/components/atoms/Error";
import LoadingIcon from "@/app/components/atoms/Icons/LoadingIcons";
import Container from "@/app/components/Container";
import FormControl from "@/app/components/Form/FormControl";
import Input from "@/app/components/Form/Input";
import Label from "@/app/components/Form/Label";
import NewsPreview from "@/app/components/organisms/NewsPreview";
import RichEditor from "@/app/components/organisms/RichEditor";
import { csrf } from "@/app/lib/csrf";
import { formDataToObject } from "@/app/lib/functions/formDataToObject";
import { http } from "@/app/lib/http";
import Axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewsCreateForm = () => {
    const [value, setValue] = useState('');
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [previewOpen, setPreviewOpen] = useState(false);
    const [newFormData, setNewsFormData] = useState<FormData | null>(null);
    const [previewData, setPreviewData] = useState<{[key: string]: string} | null>(null);
    const router = useRouter();

    const save = () => {
        setFormState('submitting');
        csrf().then(() => {
            http.post('/news', newFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(() => {
                router.push('/admin/news');
            }).catch((e) => {
                if (Axios.isAxiosError(e) && e.response) {
                    const data = e.response.data
                    setErrors(data.errors);
                }
                setFormState('error');
                setTimeout(() => {
                    setFormState('idle');
                }, 3000);
            });
        })
        // await csrf();
        // try {
        //     const res = await http.post('/news', newFormData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     });
        //     router.push('/admin/news');
        // } catch (e) {
        //     if (Axios.isAxiosError(e) && e.response) {
        //         const data = e.response.data
        //         setErrors(data.errors);
        //     }
        //     setFormState('error');
        //     setTimeout(() => {
        //         setFormState('idle');
        //     }, 3000);
        // }
    }

    const preview = (formData: FormData) => {
        formData.append('content', value);
        const obj = formDataToObject(formData);
        setNewsFormData(formData);
        setPreviewData(obj);
        setPreviewOpen(true);
    }

    return (
        <>
        {(previewData && previewOpen) && (
            <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex flex-col justify-center'>
                <div className="overflow-y-scroll h-4/5">
                    <Container>
                        <div className="bg-white">
                            <NewsPreview news={previewData} />
                        </div>
                    </Container>
                </div>
                <Container>
                    <div className="mt-4 p-4 mx-auto flex justify-center bg-white max-w-max">
                        <Button className="mr-4" onClick={() => save()} disabled={formState !== 'idle'}>
                            {formState === 'idle' && '保存する'}
                            {formState === 'submitting' && <LoadingIcon />}
                            {formState === 'error' && 'エラーが発生しました'}
                            {formState === 'success' && '更新しました'}
                        </Button>
                        <Button onClick={() => setPreviewOpen(false)} disabled={formState !== 'idle'}>修正する</Button>
                    </div>
                </Container>
            </div>
        )}
        <Container>
            <div className="bg-white min-h-screen p-4">
                <form action={preview}>
                    <div className="mb-4">
                        <FormControl flex={false}>
                            <Label htmlFor="title">タイトル *</Label>
                            <Input id="title" placeholder="タイトル" name="title" className="w-full bg-white border-gray-400" />
                        </FormControl>
                        {errors.title && <ErrorMessage message={errors.title[0]} /> }
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="content">内容* </Label>
                        <RichEditor value={value} setValue={setValue} />
                        {errors.content && <ErrorMessage message={errors.content[0]} /> }
                    </div>
                    <div className="mb-4">
                        <FormControl flex={false}>
                            <Label htmlFor="image">サムネイル</Label>
                            <Input type="file" name="image" placeholder="サムネイル" className="w-full bg-white border-gray-400" />
                        </FormControl>
                        {errors.image && <ErrorMessage message={errors.image[0]} />}
                    </div>
                    <div className="mb-4">
                        <FormControl flex={false}>
                            <Label htmlFor="slug">スラッグ</Label>
                            <Input placeholder="スラッグ" name="slug" className="w-full bg-white border-gray-400" />
                        </FormControl>
                        {errors.slug && <ErrorMessage message={errors.slug[0]} />}
                    </div>
                    <div className="text-center">
                        <Button disabled={formState !== 'idle'}>確認</Button>
                    </div>
                </form>
            </div>
        </Container>
        </>
    );
};
export default NewsCreateForm;