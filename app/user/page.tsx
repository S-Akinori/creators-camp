import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Button from "../components/atoms/Button";
import Link from "next/link";
import { getUser } from "../lib/auth";
import { getUserMaterials } from "../lib/material";
import MaterialList from "../components/organisms/MaterialList";
import LogoutButton from "../components/organisms/LogoutButton";
import { reggaeOne } from "../fonts";
import { getUserFavoriteMaterials } from "../lib/server/material";
import MaterialCard from "../components/organisms/MaterialCard";
import { getFollowings } from "../lib/server/follow";
import { limitStringLengthWithEllipsis } from "../lib/functions/limitStringLengthWithEllipsis";
import NewsList from "../components/organisms/NewsList";
import NotificationList from "../components/organisms/NotificationList";

const UserProfilePage = async () => {
    const user = await getUser();
    if (!user) {
        return null;
    }
    const materialsPagination = await getUserMaterials(user.id);
    const favoriteMaterialsPagination = await getUserFavoriteMaterials();
    const followingsPagination = await getFollowings(user.id);
    return (
        <Container className={reggaeOne.className}>
            <div className="md:flex">
                <div className="md:w-1/2 p-4">
                    <div className="flex items-center mb-4">
                        <div>
                            <Image src={user.image} width={100} height={100} alt={user.name} className="rounded-full border-2 border-main bg-main-cont rounded-full" />
                        </div>
                        <div className="ml-4">
                            <div className="mb-4">
                                <Button><Link href='/user/edit'>プロフィール編集</Link></Button>
                            </div>
                            <div>
                                <LogoutButton />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl text-main font-bold">{user.name}</h2>
                    </div>
                    <p>{user.description}</p>
                </div>
                <div className="md:w-1/2 p-4">
                    <div>
                        <h2 className="mb-4"><TextShadow className="text-2xl">運営からのお知らせ</TextShadow></h2>
                        <NewsList />
                    </div>
                    <div>
                        <h2 className="mb-4"><TextShadow className="text-2xl">マイニュース</TextShadow></h2>
                        <NotificationList />
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <Button><Link href='/user/material/create'>素材をアップロードする</Link></Button>
            </div>
            <div className="mt-8">
                <h2><TextShadow className="text-2xl">素材一覧</TextShadow></h2>
                <MaterialList materials={materialsPagination.data} />
            </div>
            <div className="mt-8">
                <h2><TextShadow className="text-2xl">お気に入りの素材</TextShadow></h2>
                <div className="flex flex-wrap">
                    {favoriteMaterialsPagination.data.map((paginationData) => (
                        <MaterialCard key={paginationData.id} material={paginationData.material} />
                    ))}
                </div>
            </div>
            <div className="mt-8">
                <h2><TextShadow className="text-2xl">フォローしたユーザー</TextShadow></h2>
                <div className="flex flex-wrap">
                    {followingsPagination.data.map((paginationData) => (
                        <div key={paginationData.id} className="w-full md:w-1/3 lg:w-1/4 p-4 mb-4">
                            <div className="bg-white p-4">
                                <Link href={`/users/${paginationData.id}`} className="text-center">
                                    <Image src={paginationData.image} width={100} height={100} alt={paginationData.name} className="rounded-full mx-auto border-main border" />
                                </Link>
                                <div className="text-center mb-4"><Link href={`/users/${user.id}`} className="text-center text-main text-xl">{paginationData.name}</Link></div>
                                {paginationData.description && <p>{limitStringLengthWithEllipsis(paginationData.description, 60)}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default UserProfilePage;