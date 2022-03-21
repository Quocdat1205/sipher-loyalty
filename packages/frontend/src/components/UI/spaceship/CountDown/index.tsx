import React, { useEffect, useRef, useState } from "react"
import { useQueryClient } from "react-query"
import { differenceInSeconds } from "date-fns"
import { HStack } from "@sipher.dev/sipher-ui"

import Colon from "./Colon"
import TimeCell from "./TimeCell"

const ONE_DAY = 60 * 60 * 24
const ONE_HOUR = 60 * 60
const ONE_MINUTE = 60

interface CountDownProps {
  deadline: number
}

const CountDown = ({ deadline }: CountDownProps) => {
  const runTimeOut = useRef(true)
  const queryClient = useQueryClient()
  const timeToCountdown = () => {
    const currentTime = new Date().getTime()
    const diffInSeconds = differenceInSeconds(deadline, currentTime)
    if (diffInSeconds <= 1) {
      queryClient.invalidateQueries("sale-config")
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }
    return {
      days: Math.floor(diffInSeconds / ONE_DAY),
      hours: Math.floor((diffInSeconds % ONE_DAY) / ONE_HOUR),
      minutes: Math.floor((diffInSeconds % ONE_HOUR) / ONE_MINUTE),
      seconds: Math.floor(diffInSeconds % ONE_MINUTE),
    }
  }
  const [countdown, setCountdown] = useState(timeToCountdown())

  useEffect(() => {
    const timeout = setTimeout(() => {
      runTimeOut.current && setCountdown(timeToCountdown())
    }, 1000)

    return () => clearTimeout(timeout)
  })

  return (
    <>
      <TimeCell value={countdown.days} unit="D" />
      <Colon />
      <TimeCell value={countdown.hours} unit="H" />
      <Colon />
      <TimeCell value={countdown.minutes} unit="M" />
      {/* <Colon />
      <TimeCell value={countdown.seconds} unit="S" /> */}
    </>
  )
}

export default CountDown
