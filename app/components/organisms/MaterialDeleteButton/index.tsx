'use client';

import { Material } from "@/app/types/Material";
import Button from "../../atoms/Button";
import clsx from "clsx";
import { reggaeOne } from "@/app/fonts";
import { useState } from "react";
import Modal from "../../molecules/Modal";
import { csrf } from "@/app/lib/csrf";
import { http } from "@/app/lib/http";
import LoadingIcon from "../../atoms/Icons/LoadingIcons";
import { useRouter } from "next/navigation";

const MaterialDeleteButton = ({ material }: { material: Material }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const router = useRouter();

    const handleDelete = async () => {
        setFormState('submitting')
        await csrf()
        try {
            const res = await http.delete(`/materials/${material.id}`)
            setFormState('success')
            setTimeout(() => {
                router.push('/user')
            }, 1000)
        } catch (error) {
            setFormState('error')
        }
    }

    return (
        <>
            <Modal open={modalOpen} setOpen={setModalOpen}>
                {formState === 'success' && <p className="text-center mb-4">削除しました。自動的にマイページに戻ります。</p>}
                {formState !== 'success' && (
                    <>
                        <p className="mb-4 font-bold text-center">本当に削除しますか？</p>
                        <p className="text-center mb-4">一度削除するとイイね数やダウンロード数など、この素材に関するデータはすべて削除されます。</p>
                        <div className="flex justify-center">
                            <Button onClick={() => setModalOpen(false)} className={clsx([reggaeOne.className, 'bg-main border-main mr-4'])}>キャンセル</Button>
                            <Button onClick={handleDelete} className={clsx([reggaeOne.className, 'bg-red-500 border-red-500'])} disabled={formState !== 'idle'}>
                                {formState === 'submitting' ? <LoadingIcon /> : '削除する'}
                            </Button>
                            {formState === 'error' && <p className="text-red-600 text-center mt-4">削除に失敗しました</p>}
                        </div>
                    </>
                )}
            </Modal>
            <Button onClick={() => setModalOpen(true)} className={clsx([reggaeOne.className, 'bg-red-500 border-red-500 mb-4'])}>素材を削除する</Button>
        </>
    )
}

export default MaterialDeleteButton;