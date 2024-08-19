import NewsEditForm from "@/app/components/organisms/NewsEditForm";
import { csrf } from "@/app/lib/csrf";
import { http } from "@/app/lib/http";
import { getNewsDetail } from "@/app/lib/news";
import { getNewsBySlug } from "@/app/lib/server/news";
import { News } from "@/app/types/News";
import Axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    params: {
        slug: string;
    }
}

const NewsEditPage = async ({ params }: Props) => {
    const news = await getNewsBySlug(params.slug);

    // const save = async (formData: FormData) => {
    //     setFormState('submitting');
    //     formData.append('content', value);
    //     await csrf();
    //     try {
    //         const res = await http.post(`/news/${news?.id}`, formData, {
    //             headers: {
    //                 'X-HTTP-Method-Override': 'PUT',
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         router.push('/admin/news');
    //     } catch (e) {
    //         if (Axios.isAxiosError(e) && e.response) {
    //             const data = e.response.data
    //             setErrors(data.errors);
    //         }
    //         setFormState('error');
    //         setTimeout(() => {
    //             setFormState('idle');
    //         }, 3000);
    //     }
    // }

    // const destroy = async () => {
    //     setFormState('submitting');
    //     await csrf();
    //     try {
    //         await http.delete(`/news/${news?.id}`);
    //         router.push('/admin/news');
    //     } catch (e) {
    //         if (Axios.isAxiosError(e) && e.response) {
    //             const data = e.response.data
    //             setErrors(data.errors);
    //         }
    //         setFormState('error');
    //         setTimeout(() => {
    //             setFormState('idle');
    //         }, 3000);
    //     }
    // }
    return (
        <NewsEditForm news={news} />
    );
};
export default NewsEditPage;