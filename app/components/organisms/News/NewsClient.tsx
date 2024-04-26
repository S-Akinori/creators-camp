'use client'

import { getNews } from "@/app/lib/news";
import { Pagination } from "@/app/types/Material";
import { News } from "@/app/types/News";
import Link from "next/link";
import { useEffect, useState } from "react";

const NewsClient = () => {
    const [news, setNews] = useState<Pagination<News> | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            const data = await getNews()
            setNews(data)
        }
        fetchNews()
    }, []);

    return (
        <div>
            {news && (
                <div>
                    <div>
                        {news.data.map((n) => (
                            <div key={n.id} className="flex items-center pb-2 mb-4 border-main border-b">
                                <div className="mr-4 w-32">{new Date(n.created_at).toLocaleDateString('ja-JP')}</div>
                                <div><Link href={`/admin/news/edit/${n.slug}`}>{n.title}</Link></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default NewsClient;