import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import client from "@client"
import useWeb3Wallet from "@web3-wallet"

import { ETHEREUM_NETWORK, NftContracts, POLYGON_NETWORK } from "@constant"
import { useBalanceContext, useChakraToast } from "@hooks"
import { setBearerToken } from "@utils"
import { useAuth } from "src/providers/auth"

const useDetail = () => {
  const { account, contractCaller, switchNetwork, chain } = useWeb3Wallet()
  const router = useRouter()
  const { bearerToken } = useAuth()
  const qc = useQueryClient()
  const {
    balance: { chainPrice },
  } = useBalanceContext()
  const { collectionId, id } = router.query
  const toast = useChakraToast()
  const [addressTo, setAddressTo] = useState("")
  const [modal, setModal] = useState("")
  const [slot, setSlot] = useState(0)
  const [isFetch, setIsFetch] = useState(false)
  const [minable, setMinable] = useState(0)
  const [slotTransfer, setSlotTransfer] = useState(1)
  const [oldAccount, setOldAccount] = useState<string | null>(null)
  const {
    data: tokenDetails,
    isLoading,
    isFetched,
    refetch,
  } = useQuery(
    ["detailNFT", account, id],
    () =>
      client.api
        .collectionControllerGetItemById(account!, id as string, setBearerToken(bearerToken))
        .then(res => res.data),
    {
      enabled: !isFetch && router.isReady && !!bearerToken && !!account,
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: data => {
        setIsFetch(true)
        setMinable(data.value)
        setSlot(data?.value > 0 ? 1 : 0)
      },
      onError: () => {
        router.push("/portfolio")
      },
    },
  )

  const collectionName =
    NftContracts.find(contract => contract.address.toLowerCase() === tokenDetails?.collection.id.toLowerCase())?.name ??
    ""

  const isOwner = account === tokenDetails?.owner

  const revalidate = () => {
    setIsFetch(false)
    qc.invalidateQueries(["detailNFT", account, id])
  }

  const { mutate: mutateTransfer721, isLoading: isLoadingTranfer721 } = useMutation(
    () => contractCaller.current!.DynamicERC721.transfer(tokenDetails!.collectionId, addressTo, tokenDetails!.tokenId),
    {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Transaction pending",
          message: "Please review your wallet notifications.",
          duration: 5000,
        })
        router.push("/")
      },
      onError: (err: any) => {
        toast({
          status: "error",
          title: "Transaction error",
          message: err.message,
          duration: 5000,
        })
      },
    },
  )

  const { mutate: mutateTransfer1155, isLoading: isLoadingTranfer1155 } = useMutation(
    () =>
      contractCaller.current!.DynamicERC1155.transfer({
        contractAddress: tokenDetails!.collectionId,
        addressTo: addressTo,
        tokenId: tokenDetails!.tokenId,
        amount: slotTransfer.toString(),
      }),
    {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Transaction pending",
          message: "Please review your wallet notifications.",
          duration: 5000,
        })
        setMinable(minable - slotTransfer)
      },
      onError: (err: any) => {
        toast({
          status: "error",
          title: "Transaction error",
          message: err.message,
          duration: 5000,
        })
      },
    },
  )

  const { mutate: mutameBurn, isLoading: isLoadingBurn } = useMutation(
    async () =>
      contractCaller.current!.SipherSpaceshipLootBox.burn({
        batchID: parseInt(tokenDetails!.tokenId),
        amount: slot,
      }),
    {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Transaction pending",
          message: "Please review your wallet notifications.",
          duration: 10000,
        })
        setMinable(minable - slot)
        setModal("")
      },
      onError: (err: any) => {
        toast({
          status: "error",
          title: "Transaction error",
          message: err.message,
          duration: 5000,
        })
        setModal("ERROR")
      },
    },
  )

  const handleClick = () => {
    setModal("BRING")
  }
  const handleMint = () => {
    if (chain?.id !== POLYGON_NETWORK) {
      switchNetwork(POLYGON_NETWORK)
    } else {
      if (chainPrice > 0.1) {
        mutameBurn()
      } else {
        toast({
          status: "error",
          title: "Error",
          message: "You have insufficient funds to create the transaction",
          duration: 5000,
        })
      }
    }
  }

  const handleTransfer = () => {
    if (tokenDetails?.collection.collectionType === "ERC1155") {
      if (chain?.id !== POLYGON_NETWORK) {
        switchNetwork(POLYGON_NETWORK)
      } else {
        mutateTransfer1155()
      }
    } else {
      if (chain?.id !== ETHEREUM_NETWORK) {
        switchNetwork(ETHEREUM_NETWORK)
      } else {
        mutateTransfer721()
      }
    }
  }

  const handleLinkOpenSea = () => {
    if (tokenDetails?.collection.collectionType === "ERC1155") {
      window.open(`https://opensea.io/assets/matic/${tokenDetails?.collectionId}/${tokenDetails?.tokenId}`, "_blank")
    } else {
      window.open(`https://opensea.io/assets/${tokenDetails?.collectionId}/${tokenDetails?.tokenId}`, "_blank")
    }
  }

  //check account changed
  useEffect(() => {
    if (account) {
      setOldAccount(account)
    }
  }, [])

  useEffect(() => {
    if (oldAccount !== null && oldAccount !== account) {
      router.push("/portfolio")
    }
  }, [oldAccount, account])

  return {
    slotTransfer,
    setSlotTransfer,
    minable,
    slot,
    setSlot,
    modal,
    setModal,
    isLoadingBurn,
    handleMint,
    handleClick,
    handleLinkOpenSea,
    isLoadingTranfer: isLoadingTranfer721 || isLoadingTranfer1155,
    addressTo,
    setAddressTo,
    handleTransfer,
    collectionName,
    router,
    isFetched,
    tokenDetails,
    isLoading,
    isOwner,
    collectionId: collectionId as string,
    tokenId: id as string,
    refetch,
    revalidate,
  }
}

const DetailContext = createContext<ReturnType<typeof useDetail> | null>(null)

export const DetailProvider = ({ children }: { children: ReactNode }) => {
  const detail = useDetail()
  return <DetailContext.Provider value={detail}>{children}</DetailContext.Provider>
}

export const useDetailContext = () => {
  const context = useContext(DetailContext)
  if (context === null) {
    throw new Error("useDetailContext must be used within a DetailProvider")
  }
  return context
}
