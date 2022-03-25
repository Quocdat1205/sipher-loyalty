import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ContractCaller } from "@contract"
import AtherIdAuth from "@sipher.dev/ather-id"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"

import { useChakraToast, useOwnedWallets } from "@hooks"
import { useAuth } from "src/providers/auth"

import { ConnectorId, connectors } from "./connectors"
import { ChainUnsupportedError } from "./errors"
import { getChainName, SUPPORTED_CHAINS_INFO } from "./network"
import { Status } from "./types"
import { clearLastActiveAccount, setLastActiveAccount, setLastConnector } from "./utils"

declare global {
  interface Window {
    ethereum: any
  }
}

const useWallet = () => {
  const [connectorName, setConnectorName] = useState<ConnectorId | null>(null)
  const [status, setStatus] = useState<Status>("disconnected")
  const [error, setError] = useState<Error | null>(null)
  const web3React = useWeb3React()
  const { account, chainId, library: ethereum } = web3React
  const activationId = useRef(0)
  // Current chain id
  const chain = useMemo(() => (chainId ? getChainName(chainId) : null), [chainId])
  const scCaller = useRef<ContractCaller | null>(null)

  const reset = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(connectors.walletConnect().web3ReactConnector as WalletConnectConnector).walletConnectProvider = undefined
    if (web3React.active) {
      web3React.deactivate()

      // Manually remove walletconnect
      localStorage.removeItem("walletconnect")
    }

    clearLastActiveAccount()
    setConnectorName(null)
    setError(null)
    setStatus("disconnected")
  }, [web3React])

  // if the user switched networks on the wallet itself
  // return unsupported error.
  useMemo(() => {
    if (web3React.error instanceof UnsupportedChainIdError) {
      setStatus("error")
      setError(new ChainUnsupportedError(web3React.error.message))
    }
  }, [web3React.error])

  const toast = useChakraToast()

  useEffect(() => {
    if (web3React.library) {
      scCaller.current = new ContractCaller(web3React.library)
    }
  }, [web3React.library])

  const ownedWallets = useOwnedWallets()

  // connect to wallet
  const connect = useCallback(
    async (connectorId: ConnectorId = "injected") => {
      const id = ++activationId.current
      reset()

      if (id !== activationId.current) {
        return
      }

      const connector = connectors[connectorId]()
      const { web3ReactConnector } = connector
      setStatus("connecting")
      setConnectorName(connectorId)

      try {
        await web3React.activate(web3ReactConnector, undefined, true)

        // save last connector name to login after refresh
        setLastConnector(connectorId)
        // listen to some event
        if (connectorId === "injected") {
          const injectedAccount = await web3ReactConnector.getAccount()
          if (injectedAccount) {
            setLastActiveAccount(injectedAccount)
          }
          web3ReactConnector.getProvider().then(provider => {
            provider.on("accountsChanged", async ([account]: string[]) => {
              if (!ownedWallets.includes(account)) {
                try {
                  const res = await AtherIdAuth.connectWallet(account!)
                  const signature = await scCaller.current?.sign(res.message)
                  await AtherIdAuth.confirmConectWallet(res, signature!)
                } catch (e: any) {
                  if (e?.code === 4001) {
                    toast({
                      status: "error",
                      title: "Signature error",
                      message: "User denied to sign the message",
                    })
                    AtherIdAuth.signOut()
                  }
                }
              }
              reset()
            })
            provider.on("chainChanged", () => {
              reset()
              window.location.reload()
            })
          })
        }
        setStatus("connected")
        const account = await web3ReactConnector.getAccount()
        return account
      } catch (err: any) {
        if (id !== activationId.current) return
        setConnectorName(null)
        setStatus("error")
        if (err instanceof UnsupportedChainIdError) {
          setError(new ChainUnsupportedError(err.message))
          toast({
            status: "error",
            title: "Unsupported network chain",
            message: "Please switch to ethereum mainnet and try again!",
          })
          return
        }

        // it might have thrown an error known by the connector
        if (connector.handleActivationError) {
          const handledError = connector.handleActivationError(err)
          if (handledError) {
            toast({
              title: handledError.name,
              message: handledError.message,
            })
            setError(handledError)
            return
          }
        }

        // otherwise, set to state the received error
        setError(err)
      }
    },
    [reset, toast, web3React],
  )

  function decimalToHexString(number: number) {
    if (number < 0) {
      number = 0xffffffff + number + 1
    }

    return "0x" + number.toString(16).toUpperCase()
  }

  const switchNetwork = (id: number) => {
    ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        SUPPORTED_CHAINS_INFO.map(i => ({ ...i, chainId: decimalToHexString(i.chainId) })).find(
          item => item.chainId === decimalToHexString(id),
        ),
      ],
    })
  }

  // auto connect on refresh
  //   useEffect(() => {
  //       const lastConnector = getLastConnector()
  //       const lastActiveAccount = getLastActiveAccount()

  //       if (lastActiveAccount && lastConnector === "injected" && !account) {
  //           connect()
  //       }
  //   }, [connect, account])

  const wallet = {
    chainId,
    web3React,
    account: account || null,
    connect,
    connector: connectorName,
    reset,
    chain,
    isConnecting: status === "connecting",
    error,
    isActive: web3React.active,
    ethereum,
    scCaller,
    switchNetwork,
  }

  return wallet
}

export default useWallet
