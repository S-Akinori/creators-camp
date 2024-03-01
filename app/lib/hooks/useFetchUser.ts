'use client'

import { User } from "@/app/types/User"
import { useEffect, useState } from "react"
import { getUser } from "../auth"

const useFetchUser = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    getUser().then((res) => {
      setUser(res)
    })
  }, [])

  return user
}

export default useFetchUser