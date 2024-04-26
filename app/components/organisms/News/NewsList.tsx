import { News } from "@/app/types/News";
import Link from "next/link";

interface Props {
    news: News[]
}

const NewsList = ({news}: Props) => {
    return (
        <ul>
            {news.map((n) => (
                <li key={n.id}>
                    <Link href={`/news/${n.slug}`}>{n.title}</Link>
                </li>
            ))}
        </ul>
    );
}

export default NewsList;