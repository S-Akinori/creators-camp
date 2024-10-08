import Container from "@/app/components/Container";
import TextShadow from "@/app/components/TextShadow";
import Button from "@/app/components/atoms/Button";
import MaterialCard from "@/app/components/organisms/MaterialCard";
import { getCategories, getCategory } from "@/app/lib/category";
import { Download, ThumbUpOffAltOutlined } from "@mui/icons-material";
import { reggaeOne } from "@/app/fonts";
import clsx from "clsx";
import { Material, Pagination as PaginationType } from "@/app/types/Material";
import { search } from "@/app/lib/search";
import MaterialList from "@/app/components/organisms/MaterialList";
import CategoryList from "@/app/components/organisms/CategoryList";
import Pagination from "@/app/components/organisms/Pagination";
import MaterialSearchForm from "@/app/components/organisms/MaterialSearchForm";
import { updateQueryString } from "@/app/lib/functions/updateQueryString";
import AISearchForm from "@/app/components/organisms/AISearchForm";
import { getUser } from "@/app/lib/auth";
import { getMaterials } from "@/app/lib/auth/material";
import FiberNewIcon from '@mui/icons-material/FiberNew';


export default async function AuthMaterialsIndexPage({searchParams} : {searchParams: { [key: string]: string | undefined }}) {
    const user = await getUser();
    const categoryId = searchParams.category_id ? Number(searchParams.category_id) : undefined;
    const page = searchParams.page ? Number(searchParams.page) : 1;
    const orderBy = searchParams.order_by ?? 'download_count'
    const keyword = searchParams.keyword ?? ''
    const exceptAi = searchParams.except_ai ?? '0'
    const categories = await getCategories();

    let materialsPagination : PaginationType<Material>;

    if(keyword) {
        materialsPagination = await getMaterials({page: page, orderBy: orderBy, search: keyword, except_ai: parseInt(exceptAi), category_id: categoryId});
    } else {
        if (categoryId === 0) {
            materialsPagination = await getMaterials({page: page, orderBy: orderBy, except_ai: parseInt(exceptAi)});
        } else {
            materialsPagination = await getMaterials({category_id: categoryId, page: page, orderBy: orderBy, except_ai: parseInt(exceptAi)});
        }
    }

    return (
        <Container>
            <h1 className="mb-8"><TextShadow className="text-2xl">素材一覧</TextShadow></h1>
            <div className="md:flex items-center">
                <div className="w-full"><MaterialSearchForm /></div>
                <div className="shrink-0"><AISearchForm defaultChecked={exceptAi === '1' ? true : false} /></div>
            </div>
            <CategoryList categories={categories} categoryId={categoryId} />
            <div className={clsx(['flex justify-end mt-4', reggaeOne.className])}>
                <div className="mx-2 md:mx-4"><Button className="rounded-none text-center !p-2" href={`/user/materials?${updateQueryString(searchParams, 'order_by', 'created_at')}`} scroll={false} color={orderBy === 'created_at' ? 'main' : 'main-cont'}>新着順<br /> <FiberNewIcon /> </Button></div>
                <div className="mx-2 md:mx-4"><Button className="rounded-none text-center !p-2" href={`/user/materials?${updateQueryString(searchParams, 'order_by', 'like_count')}`} scroll={false} color={orderBy === 'like_count' ? 'main' : 'main-cont'}>イイね順<br /> <ThumbUpOffAltOutlined /> </Button></div>
                <div className="mx-2 md:mx-4"><Button className="rounded-none text-center !p-2" href={`/user/materials?${updateQueryString(searchParams, 'order_by', 'download_count')}`} scroll={false} color={orderBy === 'download_count' ? 'main' : 'main-cont'}>DL順<br /> <Download /> </Button></div>
            </div>
            <MaterialList materials={materialsPagination.data} />
            <Pagination<Material> pagination={materialsPagination} api={`/user/materials?${updateQueryString(searchParams, 'page', '')}`} page={page} />
            <div className="mt-4 text-center">
                <Button href="/user" className="py-4">マイページへ</Button>
            </div>
        </Container>
    );
}
