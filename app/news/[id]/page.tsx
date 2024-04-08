import Button from "@/app/components/atoms/Button";
import Container from "@/app/components/Container";

interface Props {
    params: {
        id: string;
    }
}

const NewsDetailPage = ({params}: Props) => {
    return (
        <Container>
            <h1 className="mb-8 text-center font-bold text-xl text-main">ニュースタイトル</h1>
            <div className="p-4" style={{background: 'rgba(255,255,255,0.8)'}}>
                ニュースの内容。ニュースの内容
            </div>
            <div className="text-center">
                <Button href='/news'>ニュース一覧へ</Button>
            </div>
        </Container>
    );
}
export default NewsDetailPage;