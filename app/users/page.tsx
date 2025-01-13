import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Button from "../components/atoms/Button";
import Link from "next/link";
import { getUsers } from "../lib/server/user";
import Pagination from "../components/organisms/Pagination";
import { User } from "../types/User";
import UserSearchForm from "../components/organisms/UserSearchForm";
import { Pagination as PaginationType } from "../types/Material";
import { limitStringLengthWithEllipsis } from "../lib/functions/limitStringLengthWithEllipsis";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserCategoryList from "../components/organisms/UserCategoryList";
import RoundedImage from "../components/molecules/RoundedImage";

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
            <div className="md:hidden">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        カテゴリーを選択
                    </AccordionSummary>
                    <AccordionDetails>
                        <UserCategoryList roleParam={roleParam} />
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className="hidden md:block">
                <UserCategoryList roleParam={roleParam} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {usersPagination.data?.map((user) => (
                    <div key={user.id}>
                        <div className="bg-white p-4 shadow">
                            <Link href={`/users/${user.id}`} className="text-center">
                                <RoundedImage src={user.image} alt={user.name} width={120} />
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
