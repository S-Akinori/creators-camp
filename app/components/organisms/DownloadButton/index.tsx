'use client'

import { csrf } from "@/app/lib/csrf"
import Button from "../../atoms/Button"
import { http } from "@/app/lib/http"
import { saveAs } from 'file-saver'
import { useState } from "react"

interface Props {
    id: number | string
    name: string
    children?: React.ReactNode
}

const getFileName = (contentDisposition: string) => {
    console.log(contentDisposition)
    return decodeURI(contentDisposition).substring(
      contentDisposition.indexOf("''") + 2,
      contentDisposition.length,
    )
  }

const DownloadButton = ({id, name, children}: Props) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const download = async () => {
        if (isDownloading) return; // ダウンロード中はクリックを無効化

        setIsDownloading(true);
        try {
            // await csrf();
            const res = await http.get(`/materials/${id}/download`, {
                responseType: 'blob'
            });
            console.log(res.data);
            const blob = new Blob([res.data], { type: res.data.type });
            saveAs(blob, name);

            // ダウンロード処理が完了するまで待つ
            await new Promise(resolve => setTimeout(resolve, 1000)); // 完了確認のための追加の待機（必要に応じて調整）

        } catch (error) {
            console.error("Download failed:", error);
        } finally {
            setIsDownloading(false); // ダウンロード完了後に解除
        }
    }
    return (
        <Button className="mt-8 w-full py-4" onClick={download} disabled={isDownloading}>{children}</Button>
    )
}

export default DownloadButton