'use client';
import Button from "@/app/components/atoms/Button";
import ErrorMessage from "@/app/components/atoms/Error";
import LoadingIcon from "@/app/components/atoms/Icons/LoadingIcons";
import Thumbnail from "@/app/components/atoms/Thumbnail";
import Container from "@/app/components/Container";
import Input from "@/app/components/Form/Input";
import Modal from "@/app/components/molecules/Modal";
import RichEditor from "@/app/components/organisms/RichEditor";
import { csrf } from "@/app/lib/csrf";
import { http } from "@/app/lib/http";
import { getNewsDetail } from "@/app/lib/news";
import { News } from "@/app/types/News";
import Axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    params: {
        slug: string;
    }
}

const NewsEditPage = ({ params }: Props) => {
    const [news, setNews] = useState<News>();
    const [modal, setModal] = useState(false);
    const [value, setValue] = useState('');
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const router = useRouter();

    useEffect(() => {
        const fetch = async () => {
            const news = await getNewsDetail(params.slug);
            setNews(news);
            setValue(news.content);
        }
        fetch();
    }, []);

    const save = async (formData: FormData) => {
        setFormState('submitting');
        formData.append('content', value);
        await csrf();
        try {
            const res = await http.post(`/news/${news?.id}`, formData, {
                headers: {
                    'X-HTTP-Method-Override': 'PUT',
                    'Content-Type': 'multipart/form-data'
                }
            });
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

    const destroy = async () => {
        setFormState('submitting');
        await csrf();
        try {
            await http.delete(`/news/${news?.id}`);
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
            <Modal open={modal} setOpen={setModal}>
                <p>このニュースを削除してもうよろしいですか？</p>
                <p>一度削除するともとに戻せません</p>
                <div className="mt-4 flex items-center justify-center">
                    <Button className="mb-4 bg-red-600 border-red-600" onClick={destroy} disabled={formState !== 'idle'}>
                        {formState === 'idle' && '削除'}
                        {formState === 'submitting' && <LoadingIcon />}
                        {formState === 'success' && '削除しました'}
                        {formState === 'error' && 'エラーが発生しました'}
                    </Button>
                    <Button className="mb-4 ml-4" onClick={() => setModal(false)}>キャンセル</Button>
                </div>
            </Modal>
            <div className="bg-white min-h-screen p-4">
                <Button className="mb-4 bg-red-600 border-red-600" onClick={() => setModal(true)}>削除</Button>
                <form action={save}>
                    <div className="mb-4">
                        <Input placeholder="タイトル" name="title" className="w-full bg-white border-gray-400" defaultValue={news?.title} />
                        {errors.title && <ErrorMessage message={errors.title[0]} />}
                    </div>
                    <div className="mb-4">
                        <RichEditor value={value} setValue={setValue} />
                        {errors.content && <ErrorMessage message={errors.content[0]} />}
                    </div>
                    <div className="mb-4">
                        <Input type="file" name="image" placeholder="サムネイル" className="w-full bg-white border-gray-400" />
                        {news?.image && <div className="mt-4"><Thumbnail src={news?.image} /></div>}
                        {errors.image && <ErrorMessage message={errors.image[0]} />}
                    </div>
                    <div className="mb-4">
                        <Input placeholder="スラッグ" name="slug" className="w-full bg-white border-gray-400" defaultValue={news?.slug} />
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
export default NewsEditPage;