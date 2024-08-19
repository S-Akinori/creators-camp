import { Category } from "@/app/types/Category";
import Button from "../../atoms/Button";

interface Props {
    categories: Category[];
    categoryId?: number;
    url? : string;
}

export const CategoryList = ({ categories, categoryId, url = '/materials' }: Props) => {
    return (
            <div className="flex flex-wrap">
                <div className="p-2 w-1/2 md:w-1/5">
                    <Button href={url} className="w-full py-2 block text-center" scroll={false} color={!categoryId ? 'main' : 'main-cont'}>
                        すべて
                    </Button>
                </div>
                {categories.map((cat) => (
                    <div key={cat.id} className="p-2 w-1/2 md:w-1/5">
                        <Button href={`${url}?category_id=${cat.id}`} scroll={false} className="w-full py-2 block text-center" color={categoryId == cat.id ? 'main' : 'main-cont'}>
                            {cat.name}
                        </Button>
                    </div>
                ))}
            </div>
    );
}
export default CategoryList;