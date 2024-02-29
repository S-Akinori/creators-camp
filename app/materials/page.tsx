import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Button from "../components/atoms/Button";
import { getMaterials } from "../lib/material";
import MaterialCard from "../components/organisms/MaterialCard";
import { getCategories, getCategory } from "../lib/category";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default async function MaterialsIndexPage({searchParams} : {searchParams: { [key: string]: string | string[] | undefined }}) {
    const categoryId = searchParams.category_id ? Number(searchParams.category_id) : 1;
    // const materials = await getMaterials();
    const categories = await getCategories();
    const category = await getCategory(categoryId);

    const materials = category.materials
    console.log(materials)

    return (
        <Container>
            <h1><TextShadow className="text-2xl">素材一覧</TextShadow></h1>
            <div className="flex flex-wrap">
                {categories.map((cat) => (
                    <div key={cat.id} className="p-4 w-1/2 md:w-1/5">
                        <Button className="w-full py-2" color={categoryId == cat.id ? 'main' : 'main-cont'}>
                            <Link href={`/materials?category_id=${cat.id}`}>
                                {cat.name}
                            </Link>
                        </Button>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap">
                {materials?.map((material) => (
                    <MaterialCard key={material.id} material={material} />
                ))}
            </div>
            <div className="flex justify-center my-4">
                <Button className="mx-2" color="main-cont">←</Button>
                <Button className="mx-2" color="main">1</Button>
                <Button className="mx-2" color="main-cont">2</Button>
                <Button className="mx-2" color="main-cont">3</Button>
                <Button className="mx-2" color="main-cont">→</Button>
            </div>
        </Container>
    );
}
