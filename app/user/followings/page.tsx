import Image from "next/image";
import Container from "@/app/components/Container";
import TextShadow from "@/app/components/TextShadow";
import Button from "@/app/components/atoms/Button";
import MaterialCard from "@/app/components/organisms/MaterialCard";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getUsers } from "@/app/lib/server/user";
import UserCard from "@/app/components/organisms/UserCard";
import Pagination from "@/app/components/organisms/Pagination";
import { User } from "@/app/types/User";
import UserSearchForm from "@/app/components/organisms/UserSearchForm";
import { Pagination as PaginationType } from "@/app/types/Material";
import { search } from "@/app/lib/search";
import { limitStringLengthWithEllipsis } from "@/app/lib/functions/limitStringLengthWithEllipsis";
import { getUser } from "@/app/lib/auth";
import { getFollowings } from "@/app/lib/server/follow";

export default async function UsersIndexPage({searchParams} : {searchParams: { [key: string]: string | undefined }}) {
    const auth = await getUser();
    if (!auth) {
        return null;
    }
    const page = searchParams.page ? Number(searchParams.page) : 1;
    const keyword = searchParams.keyword ?? '';
    let usersPagination : PaginationType<User>;

    if(keyword) {
        usersPagination = await getFollowings({id: auth.id, page: page, search: keyword});
    } else {
        usersPagination = await getFollowings({id: auth.id, page: page});
    }

    return (
        <Container>
            <h1 className="mb-4"><TextShadow className="text-2xl">フォローしたユーザー</TextShadow></h1>
            <UserSearchForm />
            <div className="flex flex-wrap">
                {usersPagination.data?.map((user) => (
                    <div key={user.id} className="w-full md:w-1/3 lg:w-1/4 p-4 mb-4">
                        <div className="bg-white p-4">
                            <Link href={`/users/${user.id}`} className="text-center">
                                <Image src={user.image} width={100} height={100} alt={user.name} className="rounded-full mx-auto border-main border" />
                            </Link>
                            <div className="text-center mb-4"><Link href={`/users/${user.id}`} className="text-center text-main text-xl">{user.name}</Link></div>
                            {user.description && <p>{limitStringLengthWithEllipsis(user.description, 60)}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <Pagination<User> pagination={usersPagination} api={`/users?keyword=${keyword}`} page={page} />
            <div className="mt-4 text-center">
                <Button href="/user" className="py-4">マイページへ</Button>
            </div>
        </Container>
    );
}
