import { ReactElement, ReactNode, useRef } from "react"
import { Hydrate, QueryClient, QueryClientProvider } from "react-query"
import { NextPage } from "next"
import type { AppProps } from "next/app"
import Head from "next/head"
import { SipherProvider } from "@sipher.dev/sipher-ui"
import { UseWalletProvider } from "@web3"
import { Web3ReactProvider } from "@web3-react/core"

import { AuthProvider } from "src/providers/auth"

import "../style.css"

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || (page => page)

  const qcRef = useRef(new QueryClient())

  return (
    <SipherProvider>
      <QueryClientProvider client={qcRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Web3ReactProvider getLibrary={e => e}>
            <UseWalletProvider>
              <AuthProvider>
                <Head>
                  <meta charSet="utf-8" />
                  <link rel="icon" href="/favicon.ico" />
                  <meta name="viewport" content="width=device-width, initial-scale=1" />
                  <meta name="theme-color" content="#000000" />
                  <link rel="apple-touch-icon" href="/favicon.ico" />
                  <meta
                    name="description"
                    content="Sipher is a blockchain PvP PvE MOBA game for all age group. All players assets and achievements are NFTs. Exclusive characters launch coming soon!"
                  />
                  <title>Sipher Loyalty</title>
                </Head>
                {getLayout(<Component {...pageProps} />)}
              </AuthProvider>
            </UseWalletProvider>
          </Web3ReactProvider>
        </Hydrate>
      </QueryClientProvider>
    </SipherProvider>
  )
}

export default MyApp
