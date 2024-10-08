import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Button from "../components/atoms/Button";
import MaterialCard from "../components/organisms/MaterialCard";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getUsers } from "../lib/server/user";
import UserCard from "../components/organisms/UserCard";
import Pagination from "../components/organisms/Pagination";
import { User } from "../types/User";
import UserSearchForm from "../components/organisms/UserSearchForm";
import { Pagination as PaginationType } from "../types/Material";
import { search } from "../lib/search";
import { limitStringLengthWithEllipsis } from "../lib/functions/limitStringLengthWithEllipsis";

const roles = [
    'ゲームプランナー',
    'ゲームデザイナー',
    'イラストレーター',
    'グラフィッカー',
    'サウンドクリエイター',
    'シナリオライター',
    'テスター',
    'プログラマー',
    '声優',
    'その他クリエイター'
];

export default async function UsersIndexPage({searchParams} : {searchParams: { [key: string]: string | undefined }}) {
    const page = searchParams.page ? Number(searchParams.page) : 1;
    const keyword = searchParams.keyword ?? '';
    const roleParam = searchParams.role ?? '';

    let usersPagination : PaginationType<User>;

    if(keyword) {
        usersPagination = await getUsers({page: page, search: keyword, role: roleParam});
    } else {
        usersPagination = await getUsers({page: page, role: roleParam});
    }

    return (
        <Container>
            <h1 className="mb-4"><TextShadow className="text-2xl">ユーザー一覧</TextShadow></h1>
            <UserSearchForm />
            <div className="flex flex-wrap">
                <div className="p-2 w-1/2 md:w-1/5">
                    <Button href='users' className="w-full py-2 block text-center" scroll={false} color={!roleParam ? 'main' : 'main-cont'}>
                        すべて
                    </Button>
                </div>
                {roles.map((role, index) => (
                    <div key={index} className="p-2 w-1/2 md:w-1/5">
                        <Button href={`/users?role=${role}`} scroll={false} className="w-full py-2 block text-center" color={role === roleParam ? 'main' : 'main-cont'}>
                            {role}
                        </Button>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap">
                {usersPagination.data?.map((user) => (
                    <div key={user.id} className="w-full md:w-1/3 lg:w-1/4 p-4 mb-4">
                        <div className="bg-white p-4 shadow">
                            <Link href={`/users/${user.id}`} className="text-center">
                                <Image src={user.image} width={100} height={100} alt={user.name} className="rounded-full mx-auto border-main border" />
                            </Link>
                            <div className="text-center"><Link href={`/users/${user.id}`} className="text-center text-main text-xl">{user.name}</Link></div>
                            <p className="text-center mb-4">{user.role}</p>
                            {user.description && <p>{limitStringLengthWithEllipsis(user.description, 60)}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <Pagination<User> pagination={usersPagination} api={`/users?keyword=${keyword}`} page={page} />
            <div className="mt-4 text-center">
                <Button href="/materials" className="py-4">素材一覧へ</Button>
            </div>
        </Container>
    );
}
