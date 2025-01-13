import Container from "@/app/components/Container";
import MaterialDetail from "@/app/components/MaterialDetail";
import MaterialPreview from "@/app/components/organisms/MaterialPreview";
import { getUser } from "@/app/lib/auth";
import { getMaterial } from "@/app/lib/server/material";

interface Props {
    params: {
        id: string;
    },
    searchParams:  {[key: string]: string | undefined }
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