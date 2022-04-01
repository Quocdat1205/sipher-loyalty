import { ReactNode } from "react"

import { AuthLayout } from "@components/module/layout"
import { Metadata } from "@components/shared"
import SignUpUI from "@components/UI/auth/signup"
import { NextPageWithLayout } from "src/pages/_app"

const LoginPage: NextPageWithLayout = () => {
  return (
    <>
      <Metadata title="Sign Up | Sipher Loyalty" description="" />
      <SignUpUI />
    </>
  )
}

LoginPage.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>

export default LoginPage
