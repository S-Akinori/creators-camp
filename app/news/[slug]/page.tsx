import Button from "@/app/components/atoms/Button";
import Thumbnail from "@/app/components/atoms/Thumbnail";
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
            <div className="p-4" style={{background: 'rgba(255,255,255,0.8)'}}>
                <div className="mb-4">
                    <div className="mb-4">
                        <h1 className="mb-0 text-center font-bold text-xl text-main">{news.title}</h1>
                        <p className="text-center">{toDateString(news.created_at)}</p>
                    </div>
                    {news.image && (
                        <div className="md:w-1/3 mx-auto">
                            <Thumbnail src={news.image} alt={news.title} />
                        </div>
                    )}
                </div>
                <div className="page" dangerouslySetInnerHTML={{__html: news.content}}></div>
            </div>
            <div className="text-center">
                <Button href='/news'>ニュース一覧へ</Button>
            </div>
        </Container>
    );
}
export default NewsDetailPage;