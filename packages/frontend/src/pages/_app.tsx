import { ReactElement, ReactNode, useRef } from "react"
import { Hydrate, QueryClient, QueryClientProvider } from "react-query"
import { NextPage } from "next"
import type { AppProps } from "next/app"
import Head from "next/head"
import Script from "next/script"
import { SipherProvider } from "@sipher.dev/sipher-ui"
import { Web3WalletProvider } from "@web3-wallet"

import { BalanceProvider } from "@hooks"
import { AuthProvider } from "src/providers/auth"
import theme from "src/theme"

import "../style.css"

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || (page => page)

  const qcRef = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    }),
  )

  return (
    <SipherProvider theme={theme}>
      <QueryClientProvider client={qcRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Web3WalletProvider
            config={{
              walletConnect: {
                rpc: {
                  1: "https://mainnet.infura.io/v3/8e3937db21b341ceac1607d35ae551dd",
                  4: "https://rinkeby.infura.io/v3/8e3937db21b341ceac1607d35ae551dd",
                  137: "https://polygon-mainnet.infura.io/v3/8e3937db21b341ceac1607d35ae551dd",
                  80001: "https://polygon-mainnet.infura.io/v3/8e3937db21b341ceac1607d35ae551dd",
                },
              },
              coinbaseWallet: {
                url: "https://mainnet.infura.io/v3/8e3937db21b341ceac1607d35ae551dd",
                appName: "ATHERLABS LOYALTY",
              },
            }}
          >
            <AuthProvider>
              <BalanceProvider>
                <Head>
                  <meta charSet="utf-8" />
                  <link
                    rel="icon"
                    href="https://sipherstorage.s3.ap-southeast-1.amazonaws.com/web_meta/atherlabs.xyz_icon.svg"
                  />
                  <meta name="viewport" content="width=device-width, initial-scale=1" />
                  <meta name="theme-color" content="#000000" />
                  <link
                    rel="apple-touch-icon"
                    href="https://sipherstorage.s3.ap-southeast-1.amazonaws.com/web_meta/atherlabs.xyz_icon.svg"
                  />
                  <meta
                    name="description"
                    content="Sipher is a blockchain PvP PvE MOBA game for all age group. All players assets and achievements are NFTs. Exclusive characters launch coming soon!"
                  />
                  <title>Sipher Loyalty</title>
                  <Script src="https://www.googletagmanager.com/gtag/js?id=G-3RDSG9HN4G" async />
                  <Script
                    dangerouslySetInnerHTML={{
                      __html: `window.dataLayer = window.dataLayer || [];
                          function gtag(){ console.log('tag tag'); dataLayer.push(arguments); }
                          gtag('js', new Date());
                          gtag('config', 'G-3RDSG9HN4G');`,
                    }}
                  ></Script>
                </Head>
                {getLayout(<Component {...pageProps} />)}
              </BalanceProvider>
            </AuthProvider>
          </Web3WalletProvider>
        </Hydrate>
      </QueryClientProvider>
    </SipherProvider>
  )
}

export default MyApp
