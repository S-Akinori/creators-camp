'use client'
import { http } from "@/app/lib/http"
import Button from "../../atoms/Button"
import { csrf } from "@/app/lib/csrf"
import { useState } from "react"
import LoadingIcon from "../../atoms/Icons/LoadingIcons"
import Modal from "../../molecules/Modal"

interface Props {
    id: number | string
    children?: React.ReactNode
}

const PermissionRequestButton = ({id, children}: Props) => {
    const [state, setState] = useState<'ready' | 'submitting' | 'error' | 'success'>('ready')
    const [open, setOpen] = useState(false)
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
        <>
            <Modal open={open} setOpen={setOpen}>
                <p className="mb-4">承認依頼を送ってもよろしいですか？</p>
                <div className="text-center">
                    <Button className="mr-4" onClick={onClick} disabled={state !== 'ready'}>
                        {state == 'ready' && 'はい'}
                        {state == 'submitting' && <LoadingIcon />}
                        {state == 'error' && 'エラーが発生しました'}
                        {state == 'success' && '承認依頼を送りました'}
                    </Button>
                    {state !== 'success' && (
                        <Button color="main-cont" onClick={() => setOpen(false)} disabled={state !== 'ready'}>
                            いいえ
                        </Button>
                    )}
                </div>
            </Modal>
            <Button className="mt-8 w-full py-4" onClick={() => setOpen(true)} disabled={state !== 'ready'}>
                {children}
            </Button>
        </>
    )

}

export default PermissionRequestButton