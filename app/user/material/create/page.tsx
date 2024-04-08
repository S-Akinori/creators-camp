// 'use client'
import Container from "@/app/components/Container";
import clsx from "clsx";
import { reggaeOne } from "@/app/fonts";
import MaterialCreateForm from "@/app/components/organisms/MaterialCreateForm";
import { getCategories } from "@/app/lib/category";

interface ImageFile {
    file: File;
    url: string;
}

const UserMaterialCreatePage = async () => {
    const categories = await getCategories();

    return (
        <Container>
            <div>
                <h1 className={clsx([reggaeOne.className, "text-2xl text-main font-bold text-center"])}>素材アップロード</h1>
            </div>
            <MaterialCreateForm categories={categories} />
        </Container>
    );
};

export default UserMaterialCreatePage;