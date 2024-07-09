import { Pagination as PaginationType } from "@/app/types/Material";
import Button from "../../atoms/Button";

interface Props<T> {
    pagination: PaginationType<T>
    api: string
    page?: number
}

const Pagination = <T,>({pagination, api, page = 1}: Props<T>) => {
    if(pagination.total <= pagination.per_page) return null
    return (
        <div className="flex justify-center my-4">
            <div className="flex">
                <Button key="prev" href={`${api}&page=${page - 1}`} className={`mx-1`} color='main-cont'>←</Button>
                {Array.from({ length: pagination.last_page }, (_, index) => (
                    <Button key={index} href={`${api}&page=${index + 1}`} className={`mx-1`} color={index + 1 == pagination.current_page ? 'main' : 'main-cont'}>
                        {index + 1}
                    </Button>
                ))}
                <Button key="next" href={`${api}&page=${page + 1}`} className={`mx-1`} color='main-cont'>→</Button>
            </div>
        </div>
    )
}

export default Pagination;