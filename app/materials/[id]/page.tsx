import Container from "@/app/components/Container";
import MaterialDetail from "@/app/components/MaterialDetail";
import MaterialPreview from "@/app/components/organisms/MaterialPreview";
import { getUser } from "@/app/lib/auth";
import { getMaterial } from "@/app/lib/server/material";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
    params: {
        id: string;
    },
    searchParams:  {[key: string]: string | undefined }
}

type MetadataProps = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params, searchParams }: MetadataProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = (await params).id
    const material = await getMaterial(Number(id))
    const previousImages = (await parent).openGraph?.images || []
    return {
        title: material.name,
        description: material.description,
        openGraph: {
            images: [material.image, ...previousImages],
        }
    }
}


const MaterialDetailPage = async ({ params, searchParams }: Props) => {
    const material = await getMaterial(Number(params.id));
    return (
        <Container>
            {material.status === 'inactive' && <MaterialPreview id={Number(params.id)} material={material} />}
            {material.status === 'active' && <MaterialDetail id={Number(params.id)} material={material} />}
        </Container>
    )
}

export default MaterialDetailPage;