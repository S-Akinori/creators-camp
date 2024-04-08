import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Button from "../components/atoms/Button";
import { getMaterials } from "../lib/material";
import MaterialCard from "../components/organisms/MaterialCard";
import { getCategories, getCategory } from "../lib/category";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { reggaeOne } from "../fonts";
import { Download, ThumbUpOffAltOutlined } from "@mui/icons-material";

export default async function MaterialsIndexPage({searchParams} : {searchParams: { [key: string]: string | undefined }}) {
    const categoryId = searchParams.category_id ? Number(searchParams.category_id) : 1;
    const page = searchParams.page ? Number(searchParams.page) : 1;
    const orderBy = searchParams.order_by ?? 'download_count'
    console.log(categoryId, page, orderBy)
    // const materials = await getMaterials();
    const categories = await getCategories();
    const {category, materialsPagination} = await getCategory(categoryId, page, orderBy);

    return (
        <Container>
            <h1 className="mb-8"><TextShadow className="text-2xl">素材一覧</TextShadow></h1>
            <div className="flex flex-wrap">
                {categories.map((cat) => (
                    <div key={cat.id} className="p-2 w-1/2 md:w-1/5">
                        <Button href={`/materials?category_id=${cat.id}`} className="w-full py-2 block text-center" color={categoryId == cat.id ? 'main' : 'main-cont'}>
                            {cat.name}
                        </Button>
                    </div>
                ))}
            </div>
            <div className={clsx(['flex justify-center md:justify-end mt-4', reggaeOne.className])}>
                <div className="mx-4"><Button className="rounded-none text-center" href={`/materials?category_id=${category.id}&order_by=like_count`} color={orderBy === 'like_count' ? 'main' : 'main-cont'}>イイね順<br /> <ThumbUpOffAltOutlined /> </Button></div>
                <div className="mx-4"><Button className="rounded-none text-center" href={`/materials?category_id=${category.id}&order_by=download_count`} color={orderBy === 'download_count' ? 'main' : 'main-cont'}>DL順<br /> <Download /> </Button></div>
            </div>
            <div className="flex flex-wrap">
                {materialsPagination.data?.map((material) => (
                    <MaterialCard key={material.id} material={material} />
                ))}
            </div>
            <div className="flex justify-center my-4">
            {materialsPagination.total > materialsPagination.per_page && (
                <div className="flex">
                    <Button key="prev" href={`/materials?category_id=${category.id}&order_by=${orderBy}&page=${page - 1}`} className={`mx-1`} color='main-cont'>←</Button>
                    {Array.from({ length: materialsPagination.total - 1 }, (_, index) => (
                        <Button key={index} href={`/materials?category_id=${category.id}&order_by=${orderBy}&page=${index + 1}`} className={`mx-1`} color={index + 1 == materialsPagination.current_page ? 'main' : 'main-cont'}>
                            {index + 1}
                        </Button>
                    ))}
                    <Button key="next" href={`/materials?category_id=${category.id}&order_by=${orderBy}&page=${page + 1}`} className={`mx-1`} color='main-cont'>→</Button>
                </div>
            )}
            </div>
        </Container>
    );
}
