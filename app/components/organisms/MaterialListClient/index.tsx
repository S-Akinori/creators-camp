'use client';
import { Material, Pagination } from "@/app/types/Material";
import MaterialCard from "../MaterialCard";
import { useEffect, useState } from "react";
import { http } from "@/app/lib/http";
import Button from "../../atoms/Button";
import { reggaeOne } from "@/app/fonts";
import { Download, ThumbUpOffAlt } from "@mui/icons-material";
import clsx from "clsx";

interface Params {
    categoryId?: number;
    orderBy?: string;
}

const fetchMaterials = async ({categoryId, orderBy}: Params): Promise<Pagination<Material>> => {
    const res = await http.get(`/materials`, {
        params: {
            category_id: categoryId,
            order_by: orderBy
        }
    })
    return res.data
}

const MaterialListClient = ({categoryId, orderBy = 'download_count'}: Params) => {
    const [materialsPagination, setMaterialPagination] = useState<Pagination<Material>>()
    const [params, setParams] = useState<Params>({categoryId: categoryId, orderBy: orderBy})

    useEffect(() => {
        (async () => {
            const data = await fetchMaterials(params)
            setMaterialPagination(data)
        })()
    }, [params])

    const fetchNewData = async ({categoryId, orderBy}: Params) => {
        const data = await fetchMaterials({categoryId, orderBy})
        setMaterialPagination(data)
        setParams({categoryId, orderBy})
    }
    return (
        <div>
            <div className={clsx(['flex justify-end', reggaeOne.className])}>
                <div className="mx-4"><Button className="rounded-none" onClick={() => fetchNewData({categoryId: categoryId, orderBy: 'like_count'})} color={params.orderBy === 'like_count' ? 'main' : 'main-cont'}>イイね順<br /> <ThumbUpOffAlt /> </Button></div>
                <div className="mx-4"><Button className="rounded-none" onClick={() => fetchNewData({categoryId: categoryId, orderBy: 'download_count'})} color={params.orderBy === 'download_count' ? 'main' : 'main-cont'}>DL順<br /> <Download /> </Button></div>
            </div>
            <div className="flex flex-wrap">
                {materialsPagination?.data?.map((material) => (
                    <MaterialCard key={material.id} material={material} />
                ))}
            </div>
        </div>
    );
}

export default MaterialListClient;