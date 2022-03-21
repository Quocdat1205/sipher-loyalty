import React, { useCallback } from "react"
import { ToastOptions, useToast } from "@sipher.dev/sipher-ui"

import { Toast } from "../components/shared/Toast"

type UseChakraToastOptions = {
  defaultDuration: number
}

type ChakraToastOptions = {
  status?: ToastOptions["status"]
  title: string
  message?: string
  duration?: number
}
// hehe
export const useChakraToast = ({ defaultDuration }: UseChakraToastOptions = { defaultDuration: 2500 }) => {
  const toast = useToast()

  return useCallback(
    (options: ChakraToastOptions) => {
      const { status = "default", title, message, duration = defaultDuration } = options
      setTimeout(
        () =>
          toast({
            position: "bottom",
            duration,
            render: () => <Toast status={status} title={title} message={message} onClose={() => toast.closeAll()} />,
          }),
        250,
      )
    },
    [toast, defaultDuration],
  )
}

export default useChakraToast
