import { useEffect } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"

const OauthCallback: NextPage = () => {
  const { query } = useRouter()

  useEffect(() => {
    console.log(query)
  }, [query])

  return <>back</>
}

export default OauthCallback
