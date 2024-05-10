import { toDateString } from "@/app/lib/functions/toDateString"
import { getNews } from "@/app/lib/news"
import Link from "next/link"

const NewsList = async () => {
    const newslist = await getNews()
    return (
        <ul>
            {newslist.data.map(news => (
                <li key={news.id} className="mb-8 md:flex items-center border-b-2 border-main pb-2">
                    <p className="mr-4">{toDateString(news.created_at)}</p>
                    <h2 className="font-bold md:text-xl"><Link href={`/news/${news.slug}`}>{news.title}</Link></h2>
                </li>
            ))}
        </ul>
    )
}

export default NewsList