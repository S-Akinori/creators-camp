'use client'
import { http } from "@/app/lib/http"
import Button from "../../atoms/Button"
import { csrf } from "@/app/lib/csrf"
import { useState } from "react"
import LoadingIcon from "../../atoms/Icons/LoadingIcons"
import Modal from "../../molecules/Modal"
import FormControl from "../../Form/FormControl"
import Label from "../../Form/Label"
import Textarea from "../../Form/Textarea"
import ErrorMessage from "../../atoms/Error"
import axios from "axios"
import clsx from "clsx"

interface Props {
    id: number | string
    children?: React.ReactNode
    className?: string
    style?: React.CSSProperties
    type?: 'material' | 'comment'
}

const ReportButton = ({id, children, className, style, type = 'material'}: Props) => {
    const [errors, setErrors] = useState({} as any)
    const [state, setState] = useState<'ready' | 'submitting' | 'error' | 'success'>('ready')
    const [open, setOpen] = useState(false)

    const submit = async (formData: FormData) => {
        setState('submitting')
        if(type === 'comment') {
            formData.append('comment_id', id.toString())
        } else {
            formData.append('material_id', id.toString())
        }
        console.log(formData.get('description'))
        await csrf();
        try {
            await http.post(`/report/${type}`, formData)
            setState('success')
            setTimeout(() => {
                setOpen(false)
                setState('ready')
            }, 2000)
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                const data = e.response.data
                setErrors(data.errors)
            }
            setState('error')
            setTimeout(() => {
                setState('ready')
            }, 3000)
        }
    }
    return (
        <>
            <Modal open={open} setOpen={setOpen}>
                <form action={submit} className="min-w-96">
                    <FormControl flex={false}>
                        <Label htmlFor="description">不適切な理由を教えてください *</Label>
                        <Textarea id="description" name="description" className="w-full" rows={5} />
                        {errors.description && <ErrorMessage message={errors.description[0]} />}
                    </FormControl>
                    <div className="text-center">
                        <Button className="mr-4" type="submit" disabled={state !== 'ready'}>
                            {state == 'ready' && '送信'}
                            {state == 'submitting' && <LoadingIcon />}
                            {state == 'error' && 'エラーが発生しました'}
                            {state == 'success' && '送信しました'}
                        </Button>
                    </div>
                </form>
            </Modal>
            <Button style={style} color="main-cont" className={clsx(['w-full py-4', className])} onClick={() => setOpen(true)} disabled={state !== 'ready'}>
                {children}
            </Button>
        </>
    )
}

export default ReportButton