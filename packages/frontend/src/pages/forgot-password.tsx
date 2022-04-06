import { ReactNode } from "react"

import { AuthLayout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import ForgotPasswordUI from "@components/UI/auth/forgot-password"
import { NextPageWithLayout } from "src/pages/_app"

const LoginPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Ather Labs Dashboard | Forgot Password" description="" />
      <ForgotPasswordUI />
    </>
  )
}

LoginPage.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>

export default LoginPage
