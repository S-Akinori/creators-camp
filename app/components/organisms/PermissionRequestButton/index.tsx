'use client'
import { http } from "@/app/lib/http"
import Button from "../../atoms/Button"
import { csrf } from "@/app/lib/csrf"
import { useState } from "react"
import LoadingIcon from "../../atoms/Icons/LoadingIcons"

interface Props {
    id: number | string
    children?: React.ReactNode
}

const PermissionRequestButton = ({id, children}: Props) => {
    const [state, setState] = useState<'ready' | 'submitting' | 'error' | 'success'>('ready')
    const onClick = async () => {
        setState('submitting')
        await csrf();
        try {
            await http.post(`/materials/${id}/permission_request`)
            setState('success')
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
            {state == 'success' && '承認依頼を送りました'}
        </Button>
    )

}

export default PermissionRequestButton