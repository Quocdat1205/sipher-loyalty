import { useRef, useState } from "react"

const useDetectScrollBottom = () => {
  const listInnerRef = useRef(null)
  const [isEnd, setIsEnd] = useState(false)

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current
      if (scrollHeight - scrollTop - 1 <= clientHeight) {
        setIsEnd(true)
      } else {
        setIsEnd(false)
      }
    }
  }

  return { onScroll, isEnd, listInnerRef }
}
export default useDetectScrollBottom
