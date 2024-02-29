'use client'

import { User } from "@/app/types/User"
import { useEffect, useState } from "react"
import { Material } from "@/app/types/Material"
import { http } from "../http"

interface Props {
  category_id?: number
}

const useMaterial = ({category_id}: Props = { category_id: undefined }) => {
  const [materials, setMaterials] = useState<Material[] | null>(null)

    useEffect(() => {
        http.get(`/materials${category_id ? `?category_id=${category_id}` : ''}`).then((res) => {
            setMaterials(res.data)
        })
    }, [])

  return materials
}

export default useMaterial