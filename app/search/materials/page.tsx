import Container from "@/app/components/Container";
import TextShadow from "@/app/components/TextShadow";
import Button from "@/app/components/atoms/Button";
import MaterialCard from "@/app/components/organisms/MaterialCard";
import { getCategories, getCategory } from "@/app/lib/category";
import { Download, ThumbUpOffAltOutlined } from "@mui/icons-material";
import { reggaeOne } from "@/app/fonts";
import clsx from "clsx";
import { getMaterials, getMaterialsByTagId } from "@/app/lib/material";
import { Material, Pagination as PaginationType } from "@/app/types/Material";
import { search } from "@/app/lib/search";
import MaterialList from "@/app/components/organisms/MaterialList";
import CategoryList from "@/app/components/organisms/CategoryList";
import Pagination from "@/app/components/organisms/Pagination";
import MaterialSearchForm from "@/app/components/organisms/MaterialSearchForm";
import { updateQueryString } from "@/app/lib/functions/updateQueryString";
import { getTag } from "@/app/lib/tag";
import TagSearchForm from "@/app/components/organisms/TagSearchForm";

export default async function MaterialsIndexPage({searchParams} : {searchParams: { [key: string]: string | undefined }}) {
    const page = searchParams.page ? Number(searchParams.page) : 1;
    const orderBy = searchParams.order_by ?? 'download_count'
    const tagId = searchParams.tag_id ? Number(searchParams.tag_id) : 0;
    const tag = await getTag(tagId);
    const materialsPagination = await getMaterialsByTagId(tagId);

    return (
        <Container>
            <h1 className="mb-8"><TextShadow className="text-2xl">「#{tag.name}」の素材一覧</TextShadow></h1>
            <TagSearchForm />
            <div className={clsx(['flex justify-center md:justify-end mt-4', reggaeOne.className])}>
                <div className="mx-4"><Button className="rounded-none text-center" href={`/search/materials?${updateQueryString(searchParams, 'order_by', 'like_count')}`} color={orderBy === 'like_count' ? 'main' : 'main-cont'}>イイね順<br /> <ThumbUpOffAltOutlined /> </Button></div>
                <div className="mx-4"><Button className="rounded-none text-center" href={`/search/materials?${updateQueryString(searchParams, 'order_by', 'download_count')}`} color={orderBy === 'download_count' ? 'main' : 'main-cont'}>DL順<br /> <Download /> </Button></div>
            </div>
            <MaterialList materials={materialsPagination.data} />
            <Pagination<Material> pagination={materialsPagination} api={`/search/materials?tag_id=${tagId}`} page={page} />
            {/* <div className="mt-4 text-center">
                <Button href="/users" className="py-4">素材一覧へ</Button>
            </div> */}
        </Container>
    );
}
