import Button from "@/app/components/atoms/Button";
import Container from "@/app/components/Container";
import { toDateString } from "@/app/lib/functions/toDateString";
import { getNews, getNewsDetail } from "@/app/lib/news";

interface Props {
    params: {
        slug: string;
    }
}

const NewsDetailPage = async ({params}: Props) => {
    const news = await getNewsDetail(params.slug)

    return (
        <Container>
            <h1 className="mb-8 text-center font-bold text-xl text-main">{news.title}</h1>
            <p>{toDateString(news.created_at)}</p>
            <div className="p-4" style={{background: 'rgba(255,255,255,0.8)'}}>
                <div className="page" dangerouslySetInnerHTML={{__html: news.content}}></div>
            </div>
            <div className="text-center">
                <Button href='/news'>ニュース一覧へ</Button>
            </div>
        </Container>
    );
}
export default NewsDetailPage;