'use client'
import { http } from "@/app/lib/http"
import Button from "../../atoms/Button"
import { csrf } from "@/app/lib/csrf"
import { useState } from "react"
import LoadingIcon from "../../atoms/Icons/LoadingIcons"
import { useRouter } from "next/navigation"

interface Props {
    id: number | string
    children?: React.ReactNode
    token: string
    is_approved: number
}

const AcceptButton = ({id, token, is_approved, children}: Props) => {
    const [state, setState] = useState<'ready' | 'submitting' | 'error' | 'success'>('ready')
    const router = useRouter()
    const onClick = async () => {
        setState('submitting')
        await csrf();
        try {
            await http.put(`/permission_tokens/${id}`, {
                is_approved: is_approved,
                token: token
            })
            router.refresh()
        } catch (error) {
            console.log(error)
            setState('error')
        }
    }
    return (
        <Button className="mt-8 w-full py-4" onClick={onClick} disabled={state !== 'ready'}>
            {state == 'ready' && children}
            {state == 'submitting' && <LoadingIcon />}
            {state == 'error' && 'エラーが発生しました'}
            {state == 'success' && '承認しました'}
        </Button>
    )

}

export default AcceptButton