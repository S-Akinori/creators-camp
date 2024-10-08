import AdminCategoryUpdateForm from "@/app/components/AdminCategoryUpdateForm";
import Container from "@/app/components/Container"
import { getCategory } from "@/app/lib/category";

interface Props {
    params: {
        id: string;
    }
}

const AdminCategoryEditPage = async ({ params }: Props) => {
    const {category} = await getCategory(Number(params.id))
    return (
        <Container>
            <h1>カテゴリー情報更新</h1>
            <p>カテゴリーID: {category.id}</p>
            <p>カテゴリー名：{category.name}</p>
            <div className="mt-4">
                <AdminCategoryUpdateForm category={category} />
            </div>
        </Container>
    )
}

export default AdminCategoryEditPage