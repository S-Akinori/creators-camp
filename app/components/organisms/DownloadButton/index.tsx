'use client'

import { csrf } from "@/app/lib/csrf"
import Button from "../../atoms/Button"
import { http } from "@/app/lib/http"
import { saveAs } from 'file-saver'

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
    const download = async () => {
        // await csrf();
        const res = await http.get(`/materials/${id}/download`, {
            responseType: 'blob'
        });
        console.log(res.data)
        const blob = new Blob([res.data], {type: res.data.type});
        saveAs(blob, name);
    }
    return (
        <Button className="mt-8 w-full py-4" onClick={download}>{children}</Button>
    )
}

export default DownloadButton