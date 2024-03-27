import Container from "@/app/components/Container";
import clsx from "clsx";
import { reggaeOne } from "@/app/fonts";
import MaterialEditForm from "@/app/components/organisms/MaterialEditForm";
import { getUser } from "@/app/lib/auth";
import { getMaterial } from "@/app/lib/material";
import { getCategories } from "@/app/lib/category";

interface Props {
    params: {
        id: string;
    }
}

const UserMaterialEditPage = async ({params}: Props) => {
    const user = await getUser();
    const material = await getMaterial(Number(params.id));
    const categories = await getCategories();

    return (
        <main className="min-h-screen">
            {/* <Modal open={formState == 'success'} setOpen={(open) => setFormState(open ? 'success' : 'ready')}>
                <div className="text-center">
                    <p className="text-2xl font-bold mb-4">アップロード完了</p>
                    <Button className="mx-4 mb-4"><a href='/user/material/create'>続けて素材をアップする</a></Button>
                    <Button className="mx-4 block" href={'/materials/' + material?.id}>アップした素材を見る</Button>
                </div>
            </Modal> */}
            <Container>
                <div>
                    <h1 className={clsx([reggaeOne.className, "text-2xl text-main font-bold text-center"])}>素材編集</h1>
                </div>
                <div className="mt-8 mx-auto max-w-lg">
                    <MaterialEditForm material={material} categories={categories} />
                </div>
            </Container>
        </main>
    );
};

export default UserMaterialEditPage;