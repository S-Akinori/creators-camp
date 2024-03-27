'use client';

import { http } from "@/app/lib/http";
import Button from "../../atoms/Button";
import { csrf } from "@/app/lib/csrf";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();
    const onClick = async () => {
        await csrf();
        try {
            const res = await http.post('/logout');
            router.push('/login');
        } catch {
            alert('ログアウトに失敗しました');
        }

    }

    return (
        <Button onClick={onClick}>ログアウト</Button>
    );
}

export default LogoutButton;