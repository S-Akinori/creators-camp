'use client'
import { csrf } from "@/app/lib/csrf";
import { http } from "@/app/lib/http";
import { useState } from "react";
import LoadingIcon from "../../atoms/Icons/LoadingIcons";
import Button from "../../atoms/Button";

export const EmailVerificationButton = () => {
    const [state, setState] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle')
    const onClick = async () => {
        setState('submitting')
        await csrf();
        try {
            const res = await http.post('/email/verification-notification');
            setState('success')
        } catch (e) {
            setState('error')
            setTimeout(() => {
                setState('idle')
            }, 3000)
        }
    };
    return (
        <Button onClick={onClick} disabled={state !== 'idle'}>
            {state === 'idle' && '認証メールを受け取る'}
            {state === 'submitting' && <LoadingIcon />}
            {state === 'error' && 'エラーが発生しました'}
            {state === 'success' && 'メールを送信しました'}
        </Button>
    );
}

export default EmailVerificationButton;