import Container from "@/app/components/Container";
import clsx from "clsx";
import { reggaeOne } from "@/app/fonts";
import { getMaterial } from "@/app/lib/material";
import { getCategories } from "@/app/lib/category";
import MaterialCreateForm from "@/app/components/organisms/MaterialCreateForm";
import MaterialEditForm from "@/app/components/organisms/MaterialEditForm";

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
            <div>
                <h1 className={clsx([reggaeOne.className, "text-2xl text-main font-bold text-center"])}>素材編集</h1>
            </div>
            <div className="mt-8 p-4 mx-auto max-w-2xl bg-white shadow">
                <MaterialEditForm material={material} categories={categories} />
            </div>
        </Container>
    );
};

export default UserMaterialEditPage;