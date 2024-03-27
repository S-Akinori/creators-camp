import Image from "next/image";
import Container from "@/app/components/Container";
import TextShadow from "@/app/components/TextShadow";
import FormControl from "@/app/components/Form/FormControl";
import Input from "@/app/components/Form/Input";
import Label from "@/app/components/Form/Label";
import Textarea from "@/app/components/Form/Textarea";
import useFetchUser from "@/app/lib/hooks/useFetchUser";
import { getUser } from "@/app/lib/auth";
import UserProfileUpdateForm from "@/app/components/organisms/UserProfileUpdateForm";
import PasswordUpdateForm from "@/app/components/organisms/PasswordUpdateForm";

const UserProfileEditPage = async () => {
    const user = await getUser();

    return (
        <Container>
            <div className="mb-8">
                <h1><TextShadow className="text-2xl">プロフィール編集</TextShadow></h1>
                <UserProfileUpdateForm user={user} /> 
            </div>
            <div>
                <h2><TextShadow className="text-2xl">パスワード変更</TextShadow></h2>
                <PasswordUpdateForm />
            </div>
        </Container>
    );
};

export default UserProfileEditPage;