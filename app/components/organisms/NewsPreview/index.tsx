'use client'
import Container from '../../Container';
import Thumbnail from '../../atoms/Thumbnail';
import Button from '../../atoms/Button';
import { toDateString } from '@/app/lib/functions/toDateString';

interface Props {
    news: {[key: string]: any};
}

const NewsPreview = ({ news }: Props) => {
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
      
        return `${year}/${month}/${day}`;
      }

    return (
        <Container>
            <div className="p-4" style={{background: 'rgba(255,255,255,0.8)'}}>
                <div className="mb-4">
                    <div className="mb-4">
                        <h1 className="mb-0 text-center font-bold text-xl text-main">{news.title}</h1>
                        <p className="text-center">{ news.created_at ? toDateString(news.created_at) : formatDate(new Date())}</p>
                    </div>
                    {news.image.name && (
                        <div className="md:w-1/3 mx-auto">
                            <Thumbnail src={typeof news.image === 'string' ? news.image : URL.createObjectURL(news.image)} alt={news.title} />
                        </div>
                    )}
                </div>
                <div className="page" dangerouslySetInnerHTML={{__html: news.content}}></div>
            </div>
            <div className="text-center">
                <Button>ニュース一覧へ</Button>
            </div>
        </Container>
    );
}

export default NewsPreview;