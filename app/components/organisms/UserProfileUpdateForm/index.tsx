'use client'
import Image from "next/image"
import FormControl from "../../Form/FormControl"
import Label from "../../Form/Label"
import Input from "../../Form/Input"
import { User } from "@/app/types/User"
import Textarea from "../../Form/Textarea"
import { update } from "@/app/lib/server/auth"
import { csrf } from "@/app/lib/csrf"
import { http } from "@/app/lib/http"
import useFormSubmit from "@/app/lib/hooks/useFormSubmit"
import LoadingIcon from "../../atoms/Icons/LoadingIcons"
import ErrorMessage from "../../atoms/Error"
import SuccessMessage from "../../atoms/Message"
import { ChangeEvent, useState } from "react"
import Select from "../../Form/Select"

interface Props {
    user: User
}

const UserProfileUpdateForm = ({user}: Props) => {
    const [previewUrl, setPreviewUrl] = useState<string>(user.image);
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle')
    const update = async (formData: FormData) => {
        setFormState('submitting')
        await csrf()
        try {
            if((formData.get('file') as File).name !== '') {
                const fileRes = await http.post('/file', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                        }
                    })
                const fileData = fileRes.data
                formData.set('image', fileData.path)
            }
            const data = Object.fromEntries(formData.entries())
            const res = await http.put('/user/profile-information', data)
            setFormState('success')
            return res.data
        } catch (e) {
            console.error(e)
            setFormState('error')
        } finally {
            setTimeout(() => setFormState('idle'), 3000)
        }
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file =  e.target.files ? e.target.files[0] : null
        if (file) {
          // ファイルリーダーを使用して画像を読み込み、プレビューとして設定
          const reader = new FileReader();
          reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
            if (loadEvent.target?.result) {
                setPreviewUrl(loadEvent.target.result as string);
                }
          };
          reader.readAsDataURL(file);
        }
      };
    return (
        <form action={update}>
            <div className="flex mt-8">
                <div className="mb-4 mr-4 shrink-0">
                    <div className="rounded-full border-2 border-main bg-main-cont w-24 h-24 relative">
                        <Image src={previewUrl} alt={user.name} fill objectFit="cover" className="rounded-full" />
                    </div>
                </div>
                <FormControl flex={false}>
                    <Label htmlFor="file" className="shrink-0 mr-4">プロフィール画像</Label>
                    <Input type="file" name="file" className="w-full" accept="image/*" onChange={handleImageChange} />
                </FormControl>
            </div>
            <FormControl flex={false}>
                <Label htmlFor="name" className="shrink-0 mr-4">ユーザー名</Label>
                <Input id="name" name="name" type="text" className="w-full" defaultValue={user.name} />
            </FormControl>
            <FormControl flex={false}>
                <Label htmlFor="description" className="shrink-0 mr-4">説明文</Label>
                <Textarea id="description" name="description" className="w-full">{user.description}</Textarea>
            </FormControl>
            <FormControl flex={false}>
                <Label htmlFor="email" className="shrink-0 mr-4">メールアドレス</Label>
                <Input id="email" name="email" type="text" className="w-full" defaultValue={user.email} />
            </FormControl>
            <FormControl flex={false}>
                <Label htmlFor="email" className="shrink-0 mr-4">クリエイタータイプ</Label>
                <Select id="role" name="role" className="w-full" defaultValue={user.role}>
                    <option value="ゲームプランナー">ゲームプランナー</option>
                    <option value="ゲームデザイナー">ゲームデザイナー</option>
                    <option value="イラストレーター">イラストレーター</option>
                    <option value="グラフィッカー">グラフィッカー</option>
                    <option value="サウンドクリエイター">サウンドクリエイター</option>
                    <option value="シナリオライター">シナリオライター</option>
                    <option value="テスター">テスター</option>
                    <option value="プログラマー">プログラマー</option>
                    <option value="声優">声優</option>
                    <option value="その他クリエイター">その他クリエイター</option>
                </Select>
            </FormControl>
            <FormControl flex={false}>
                <Label htmlFor="skill" className="shrink-0 mr-4">スキル</Label>
                <Textarea id="skill" name="skill" className="w-full">{user.skill}</Textarea>
            </FormControl>
            <FormControl flex={false}>
                <Label htmlFor="x_link" className="shrink-0 mr-4">Xリンク</Label>
                <Input id="x_link" name="x_link" type="text" className="w-full" defaultValue={user.x_link} />
            </FormControl>
            <FormControl flex={false}>
                <Label htmlFor="website" className="shrink-0 mr-4">WEBサイト</Label>
                <Input id="website" name="website" type="text" className="w-full" defaultValue={user.website} />
            </FormControl>
            <FormControl flex={false}>
                <Label htmlFor="created_game" className="shrink-0 mr-4">作成したゲーム</Label>
                <Textarea id="created_game" name="created_game" className="w-full">{user.created_game}</Textarea>
            </FormControl>
            <FormControl flex={false}>
                <Label htmlFor="contributed_game" className="shrink-0 mr-4">貢献したゲーム</Label>
                <Textarea id="contributed_game" name="contributed_game" className="w-full">{user.contributed_game}</Textarea>
            </FormControl>
            <div className="text-center mt-8">
                <button type="submit" className="py-4 px-16 bg-main text-white rounded-full" disabled={formState === 'submitting'}>
                    {formState === 'idle' && '保存'}
                    {formState === 'submitting' && <LoadingIcon />}
                    {formState === 'success' && '保存しました'}
                    {formState === 'error' && 'エラーが発生しました'}
                </button>
            </div>
        </form>
    )
}

export default UserProfileUpdateForm