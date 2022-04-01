import { ReactNode } from "react"

import { AuthLayout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import LoginUI from "@components/UI/auth/login"
import { NextPageWithLayout } from "src/pages/_app"

const LoginPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Sign In | Sipher Loyalty" description="" />
      <LoginUI />
    </>
  )
}

LoginPage.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>

export default LoginPage
