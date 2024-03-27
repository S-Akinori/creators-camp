import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Button from "../components/atoms/Button";
import MaterialCard from "../components/organisms/MaterialCard";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getUsers } from "../lib/server/user";
import UserCard from "../components/organisms/UserCard";

export default async function UsersIndexPage({searchParams} : {searchParams: { [key: string]: string | string[] | undefined }}) {
    const page = searchParams.page ? Number(searchParams.page) : 1;
    const usersPagination = await getUsers();

    return (
        <Container>
            <h1 className="mb-4"><TextShadow className="text-2xl">ユーザー一覧</TextShadow></h1>
            <div className="flex flex-wrap">
                {usersPagination.data?.map((user) => (
                    <div key={user.id} className="w-full md:w-1/3 lg:w-1/4 p-4 mb-4">
                        <div className="bg-white p-4">
                            <Link href={`/users/${user.id}`} className="text-center">
                                <Image src={user.image} width={100} height={100} alt={user.name} className="rounded-full mx-auto border-main border" />
                            </Link>
                            <div className="text-center mb-4"><Link href={`/users/${user.id}`} className="text-center text-main text-xl">{user.name}</Link></div>
                            <p className="text-center">{user.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center my-4">
                {usersPagination.total > usersPagination.per_page && (
                    <div className="flex">
                        <Button key="prev" href={`/users&page=${page - 1}`} className={`mx-1`} color='main-cont'>←</Button>
                        {Array.from({ length: usersPagination.total - 1 }, (_, index) => (
                            <Button key={index} href={`/users&page=${index + 1}`} className={`mx-1`} color={index + 1 == usersPagination.current_page ? 'main' : 'main-cont'}>
                                {index + 1}
                            </Button>
                        ))}
                        <Button key="next" href={`/users&page=${page + 1}`} className={`mx-1`} color='main-cont'>→</Button>
                    </div>
                )}
            </div>
        </Container>
    );
}
