'use client';
import { Material, Pagination } from "@/app/types/Material";
import MaterialCard from "../MaterialCard";
import { useEffect, useState } from "react";
import { http } from "@/app/lib/http";
import Button from "../../atoms/Button";
import { reggaeOne } from "@/app/fonts";
import { Download, ThumbUpOffAlt } from "@mui/icons-material";
import clsx from "clsx";
import { getMaterials } from "@/app/lib/material";
import FiberNewIcon from '@mui/icons-material/FiberNew';
import Image from "next/image";
import TextShadow from "../../TextShadow";
import Link from "next/link";


interface Params {
    categoryId?: number;
    orderBy?: string;
    title?: string;
    icon?: string;
    moreLinkText?: string;
}

const fetchMaterials = async ({ categoryId, orderBy }: Params): Promise<Pagination<Material>> => {
    const data = await getMaterials({ category_id: categoryId, orderBy: orderBy })
    return data
}

const MaterialListClient = ({ categoryId, orderBy = 'download_count', title, icon, moreLinkText }: Params) => {
    const [materialsPagination, setMaterialPagination] = useState<Pagination<Material>>()
    const [params, setParams] = useState<Params>({ categoryId: categoryId, orderBy: orderBy })

    useEffect(() => {
        (async () => {
            const data = await fetchMaterials(params)
            setMaterialPagination(data)
        })()
    }, [params])

    const fetchNewData = async ({ categoryId, orderBy }: Params) => {
        const data = await fetchMaterials({ categoryId, orderBy })
        setMaterialPagination(data)
        setParams({ categoryId, orderBy })
    }
    return (
        <div>
            <div className="md:flex justify-between items-center">
                <div className="md:flex items-center mb-4">
                    {(title && icon) && (
                        <div className="relative mb-4 md:mb-0">
                            <Image src={icon} width={50} height={50} alt='ランキング' className="absolute left-0 top-0" />
                            <p className="relative pl-4"><TextShadow className=" md:text-2xl" color="accent" align="left">{title}</TextShadow></p>
                        </div>
                    )}
                    <div className={clsx(['flex justify-center', reggaeOne.className])}>
                        <div className="mx-2 md:mx-4"><Button className="rounded-none !p-2 min-w-20" onClick={() => fetchNewData({ categoryId: categoryId, orderBy: 'like_count' })} color={params.orderBy === 'like_count' ? 'main' : 'main-cont'}>イイね順<br /> <ThumbUpOffAlt /> </Button></div>
                        <div className="mx-2 md:mx-4"><Button className="rounded-none !p-2 min-w-20" onClick={() => fetchNewData({ categoryId: categoryId, orderBy: 'download_count' })} color={params.orderBy === 'download_count' ? 'main' : 'main-cont'}>DL順<br /> <Download /> </Button></div>
                    </div>
                </div>
                {moreLinkText && (
                    <div className="hidden lg:block text-right">
                        <Link href={'/materials?category_id=' + categoryId} className="bg-gray-400 py-2 px-4 text-white">{moreLinkText}</Link>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {materialsPagination?.data?.map((material) => (
                    <MaterialCard key={material.id} material={material} />
                ))}
            </div>
            {moreLinkText && (
                <div className="block lg:hidden text-right mt-8">
                    <Link href={'/materials?category_id=' + categoryId} className="bg-gray-400 py-2 px-4 text-white">{moreLinkText}</Link>
                </div>
            )}
        </div>
    );
}

export default MaterialListClient;