import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ContractCaller } from "@contract"
import { AuthType, ChangeWalletAction, useAuthFlowStore } from "@store"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"

import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

import { ConnectorId, connectors } from "./connectors"
import { getChainName, SUPPORTED_CHAINS_INFO } from "./network"
import {
  clearLastActiveAccount,
  getLastActiveAccount,
  getLastConnector,
  setLastActiveAccount,
  setLastConnector,
} from "./utils"

declare global {
  interface Window {
    ethereum: any
  }
}

const useWallet = () => {
  const [isListened, setIsListened] = useState(false)
  const [connectorName, setConnectorName] = useState<ConnectorId | null>(null)
  const web3React = useWeb3React()
  const { account, chainId, library: ethereum } = web3React
  const activationId = useRef(0)
  // Current chain id
  const chain = useMemo(() => (chainId ? getChainName(chainId) : null), [chainId])
  const scCaller = useRef<ContractCaller | null>(null)
  const [flowState, setFlowState] = useAuthFlowStore(s => [s.state, s.setState])
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
  }, [web3React])

  const toast = useChakraToast()

  useEffect(() => {
    if (web3React.library) {
      scCaller.current = new ContractCaller(web3React.library)
    }
  }, [web3React.library])

  const { ownedWallets, authenticated } = useAuth()
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
        }
        const account = await web3ReactConnector.getAccount()
        return account?.toLowerCase()
      } catch (err: any) {
        if (id !== activationId.current) return
        setConnectorName(null)
        if (err instanceof UnsupportedChainIdError) {
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
              status: "error",
              title: handledError.name,
              message: handledError.message,
            })
            return
          }
        }
      }
    },
    [reset, toast, web3React],
  )

  useEffect(() => {
    if (ethereum && !isListened) {
      console.log("Setting up account listener")
      setIsListened(true)
      ethereum.on("accountsChanged", ([account]) => {
        console.log("Event: accountsChanged", account)
        if (authenticated && account) {
          console.log(ownedWallets, flowState)
          if (!ownedWallets.includes(account) && flowState === null) {
            setFlowState({ type: AuthType.ChangeWallet, action: ChangeWalletAction.Change })
          } else if (
            ownedWallets.includes(account) &&
            flowState?.type === AuthType.ChangeWallet &&
            flowState.action === ChangeWalletAction.Change
          ) {
            setFlowState(null)
          }
        }
      })
    }
  }, [ethereum, authenticated, ownedWallets, flowState, reset, isListened])

  const switchNetwork = async (id: number) => {
    const decimalToHexString = (value: number) =>
      value < 0 ? (0xffffffff + value + 1).toString() : "0x" + value.toString(16).toUpperCase()

    if (id === 1) {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: decimalToHexString(1) }],
      })
    } else {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          SUPPORTED_CHAINS_INFO.map(i => ({ ...i, chainId: decimalToHexString(i.chainId) })).find(
            item => item.chainId === decimalToHexString(id),
          ),
        ],
      })
    }

    window.location.reload()
  }

  // auto connect on refresh
  useEffect(() => {
    const lastConnector = getLastConnector()
    const lastActiveAccount = getLastActiveAccount()

    if (lastActiveAccount && lastConnector === "injected" && !account) {
      connect()
    }
  }, [connect, account])

  const wallet = {
    chainId,
    web3React,
    account: account?.toLowerCase() || null,
    connect,
    connector: connectorName,
    reset,
    chain,
    isActive: web3React.active,
    ethereum,
    scCaller,
    switchNetwork,
  }

  return wallet
}

export default useWallet
