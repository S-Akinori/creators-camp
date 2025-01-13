import Container from "@/app/components/Container";
import clsx from "clsx";
import { reggaeOne } from "@/app/fonts";
import { getMaterial } from "@/app/lib/server/material";
import { getCategories } from "@/app/lib/category";
import MaterialCreateForm from "@/app/components/organisms/MaterialCreateForm";

interface Props {
    params: {
        id: string;
    }
}

const UserMaterialEditPage = async ({ params }: Props) => {
    const material = await getMaterial(Number(params.id));
    const categories = await getCategories();
    return (
        <Container>
            <div className="py-4">
                <h1 className={clsx([reggaeOne.className, "text-2xl text-main font-bold text-center"])}>素材アップロード</h1>
                <MaterialCreateForm material={material} categories={categories} />
            </div>
        </Container>
    );
};

export default UserMaterialEditPage;