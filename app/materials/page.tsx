import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Button from "../components/atoms/Button";
import MaterialCard from "../components/organisms/MaterialCard";
import { getCategories, getCategory } from "../lib/category";
import { Download, ThumbUpOffAltOutlined } from "@mui/icons-material";
import { reggaeOne } from "../fonts";
import clsx from "clsx";
import { getMaterials } from "../lib/material";
import { Material, Pagination as PaginationType } from "../types/Material";
import { search } from "../lib/search";
import MaterialList from "../components/organisms/MaterialList";
import CategoryList from "../components/organisms/CategoryList";
import Pagination from "../components/organisms/Pagination";
import MaterialSearchForm from "../components/organisms/MaterialSearchForm";
import { updateQueryString } from "../lib/functions/updateQueryString";
import AISearchForm from "../components/organisms/AISearchForm";
import { csrf } from "../lib/csrf";
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default async function MaterialsIndexPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const categoryId = searchParams.category_id ? Number(searchParams.category_id) : undefined;
    const page = searchParams.page ? Number(searchParams.page) : 1;
    const orderBy = searchParams.order_by ?? 'download_count'
    const keyword = searchParams.keyword ?? ''
    const exceptAi = searchParams.except_ai ?? '0'
    const tagId = searchParams.tag_id ? Number(searchParams.tag_id) : undefined;
    const categories = await getCategories();

    let materialsPagination: PaginationType<Material>;

    await csrf();

    if (keyword) {
        materialsPagination = await getMaterials({ page: page, tag_id: tagId, orderBy: orderBy, search: keyword, except_ai: parseInt(exceptAi), category_id: categoryId });
    } else {
        if (categoryId === 0) {
            materialsPagination = await getMaterials({ page: page, tag_id: tagId, orderBy: orderBy, except_ai: parseInt(exceptAi) });
        } else {
            materialsPagination = await getMaterials({ category_id: categoryId, tag_id: tagId, page: page, orderBy: orderBy, except_ai: parseInt(exceptAi) });
        }
    }

    return (
        <Container>
            <h1 className="mb-8"><TextShadow className="text-2xl">素材一覧</TextShadow></h1>
            <div className="md:flex items-center">
                <div className="w-full"><MaterialSearchForm /></div>
                <div className="shrink-0"><AISearchForm defaultChecked={exceptAi === '1' ? true : false} /></div>
            </div>
            <div className="md:hidden">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        カテゴリーを選択
                    </AccordionSummary>
                    <AccordionDetails>
                        <CategoryList categories={categories} categoryId={categoryId} />
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className="hidden md:block">
                <CategoryList categories={categories} categoryId={categoryId} />
            </div>
            <div className={clsx(['flex justify-end my-4', reggaeOne.className])}>
                <div className="mx-2 md:mx-4"><Button className="rounded-none text-center !p-2" href={`/materials?${updateQueryString(searchParams, 'order_by', 'created_at')}`} scroll={false} color={orderBy === 'created_at' ? 'main' : 'main-cont'}>新着順<br /> <FiberNewIcon /> </Button></div>
                <div className="mx-2 md:mx-4"><Button className="rounded-none text-center !p-2" href={`/materials?${updateQueryString(searchParams, 'order_by', 'like_count')}`} scroll={false} color={orderBy === 'like_count' ? 'main' : 'main-cont'}>イイね順<br /> <ThumbUpOffAltOutlined /> </Button></div>
                <div className="mx-2 md:mx-4"><Button className="rounded-none text-center !p-2" href={`/materials?${updateQueryString(searchParams, 'order_by', 'download_count')}`} scroll={false} color={orderBy === 'download_count' ? 'main' : 'main-cont'}>DL順<br /> <Download /> </Button></div>
            </div>
            <MaterialList materials={materialsPagination.data} />
            <Pagination<Material> pagination={materialsPagination} api={`/materials?${updateQueryString(searchParams, 'page', '')}`} page={page} />
            <div className="mt-4 text-center">
                <Button href="/users" className="py-4">ユーザー一覧へ</Button>
            </div>
        </Container>
    );
}
