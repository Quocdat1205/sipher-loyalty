import { useEffect, useRef, useState } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { format } from "date-fns"
import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  IconButton,
  Input,
  Stack,
  Text,
  useOutsideClick,
} from "@sipher.dev/sipher-ui"

import MultiPicker from "./Picker/MultiPicker"
import Picker from "./Picker/Picker"
import { SpCalendar } from "./icons"

const calendarData = {
  dayName: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  months: [
    { id: 0, name: "January" },
    { id: 1, name: "February" },
    { id: 2, name: "March" },
    { id: 3, name: "April" },
    { id: 4, name: "May" },
    { id: 5, name: "June" },
    { id: 6, name: "July" },
    { id: 7, name: "August" },
    { id: 8, name: "September" },
    { id: 9, name: "October" },
    { id: 10, name: "November" },
    { id: 11, name: "December" },
  ],
  days: [
    { id: 0, name: "Sunday" },
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
  ],
}

interface IDateItem {
  id: number
  month: "previous" | "current" | "next"
  value: number
}

interface ICalendar {
  value: string | null
  onChange: (newDate: string) => void
}

const useCalendar = ({ value, onChange }: ICalendar) => {
  const [popup, setPopup] = useState(false)
  const [tempValue, setTempValue] = useState(value)
  const [openMonth, setOpenMonth] = useState(false)
  const closePopup = () => {
    setPopup(false), setOpenMonth(false)
  }

  useEffect(() => {
    setTempValue(value)
  }, [value])

  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick({
    ref,
    handler: closePopup,
  })
  const { dayName, months } = calendarData
  const date = useRef(new Date(value ? value : new Date().toDateString()))
  const isDateSelected = (day: IDateItem) =>
    tempValue &&
    day.value === new Date(tempValue).getDate() &&
    day.month === "current" &&
    date.current.getMonth() === new Date(tempValue).getMonth()

  const isDateCurrent = (day: IDateItem) =>
    day.value === new Date().getDate() &&
    day.month === "current" &&
    date.current.getMonth() === new Date().getMonth()

  const getMonthName = (id) => months.find((month) => month.id === id)!.name
  const [yearState, setYearState] = useState(date.current.getFullYear())
  const [firstYear, setFirstYear] = useState(yearState - (yearState % 10))
  const getDaysInMonth = (m, y) => {
    m += 1
    return /8|3|5|10/.test((--m).toString())
      ? 30
      : m === 1
      ? (!(y % 4) && y % 100) || !(y % 400)
        ? 29
        : 28
      : 31
  }
  const [dataPicker, setDataPicker] = useState([
    date.current.getMonth(),
    date.current.getFullYear(),
  ])
  const updateCalendarTable = () => {
    const dayofmonth: IDateItem[] = []
    let id = 0
    const previousNumDate = getDaysInMonth(
      date.current.getMonth() - 1,
      date.current.getFullYear()
    )
    //get day of week of the first day of the month
    const x = new Date(
      `${date.current.getFullYear()}-${date.current.getMonth() + 1}-01`
    ).getDay()

    for (
      let i = 1 - ((x + 6) % 7);
      i <= getDaysInMonth(date.current.getMonth(), date.current.getFullYear());
      i++
    ) {
      if (i <= 0) {
        dayofmonth.push({
          id: id,
          month: "previous",
          value: previousNumDate + i,
        })
      } else {
        dayofmonth.push({ id: id, month: "current", value: i })
      }
      id++
    }
    for (let j = 0; j < dayofmonth.length % 7; j++) {
      dayofmonth.push({ id: id, month: "next", value: j + 1 })
      id++
    }
    return dayofmonth
  }
  // calendar table
  const [calendar, setCalendar] = useState(updateCalendarTable())

  const swipe = (type) => {
    date.current.setMonth(
      date.current.getMonth() + (type === "next" ? 1 : -1),
      1
    )
    if (
      (type === "next" && date.current.getMonth() === 0) ||
      (type === "prev" && date.current.getMonth() === 11)
    )
      setYearState(date.current.getFullYear())
    setCalendar(updateCalendarTable())
  }
  const updateMonth = (month) => {
    date.current.setMonth(month)
    date.current.setFullYear(yearState)
    setCalendar(updateCalendarTable())
  }
  const swipeYear = (type) => {
    date.current.setFullYear(
      date.current.getFullYear() + (type === "next" ? 1 : -1)
    )
    setYearState(yearState + (type === "next" ? 1 : -1))
    setCalendar(updateCalendarTable())
  }
  const swipe12 = (type) => {
    setFirstYear(firstYear + (type === "next" ? 12 : -12))
  }
  const selectDate = (day) => {
    date.current.setMonth(
      date.current.getMonth() +
        (day.month === "previous" ? -1 : day.month === "next" ? 1 : 0)
    )
    date.current.setDate(day.value)
    date.current.setHours(17, 30)
    // onChange(date.current.toISOString());
    setTempValue(date.current.toISOString())
    setCalendar(updateCalendarTable())
  }

  const handleDone = () => {
    if (tempValue) {
      onChange(tempValue)
      closePopup()
    } else {
      onChange(new Date().toDateString())
    }
  }

  const handleReset = () => {
    setTempValue(value)
  }

  const displayYear = () => {
    return firstYear + " - " + (firstYear + 11)
  }

  const updatePicker = (month, year) => {
    date.current.setMonth(month)
    date.current.setFullYear(yearState)
    setCalendar(updateCalendarTable())

    date.current.setFullYear(year)
    setYearState(year)
    setCalendar(updateCalendarTable())

    setDataPicker([month, year])
  }

  const render24Year = () => {
    const arr: JSX.Element[] = []
    for (let i = 1900; i < 2100; i++) {
      arr.push(
        <Picker.Item key={i} value={i}>
          {i}
        </Picker.Item>
      )
    }
    return arr
  }
  const clickIcon = () => {
    setPopup(!popup)
  }
  const clickTitle = () => {
    setOpenMonth(!openMonth)
  }

  return {
    ref,
    popup,
    clickIcon,
    date,
    getMonthName,
    swipe,
    swipe12,
    swipeYear,
    dayName,
    calendar,
    selectDate,
    setFirstYear,
    yearState,
    months,
    updateMonth,
    displayYear,
    render24Year,
    isDateSelected,
    openMonth,
    clickTitle,
    doneSelect: handleDone,
    dataPicker,
    updatePicker,
    handleReset,
    isDateCurrent,
    setOpenMonth,
  }
}

interface DisplayerProps {
  title: string
  isDisableChevron?: boolean
  onPrevClick?: () => void
  onNextClick?: () => void
  children: React.ReactNode
  onTitleClick?: () => void
}

const Displayer = ({
  title,
  onPrevClick,
  onNextClick,
  children,
  onTitleClick,
  isDisableChevron = false,
}: DisplayerProps) => {
  return (
    <Flex flexDir="column" flex={1} w="full">
      <Flex h="32px" px={2} align="center" userSelect="none" mb={2}>
        <SpCalendar color="#F4B433" />
        <Text
          whiteSpace="nowrap"
          isTruncated
          w="9rem"
          ml={2}
          fontWeight={600}
          cursor="pointer"
          onClick={onTitleClick}
        >
          {title}
        </Text>
        {!isDisableChevron && (
          <Flex ml={2} align="center">
            <IconButton
              _hover={{ bg: "accent.500", color: "neutral.900" }}
              boxSize="32px"
              icon={<BsChevronLeft />}
              size="sm"
              rounded="full"
              variant="ghost"
              aria-label="prev"
              onClick={onPrevClick}
            />
            <IconButton
              _hover={{ bg: "accent.500", color: "neutral.900" }}
              boxSize="32px"
              icon={<BsChevronRight />}
              size="sm"
              rounded="full"
              variant="ghost"
              aria-label="next"
              onClick={onNextClick}
            />
          </Flex>
        )}
      </Flex>
      {children}
    </Flex>
  )
}

export const Calendar = ({ value, onChange }: ICalendar) => {
  const {
    ref,
    popup,
    clickIcon,
    date,
    getMonthName,
    swipe,
    dayName,
    calendar,
    selectDate,
    months,
    render24Year,
    isDateSelected,
    openMonth,
    clickTitle,
    doneSelect,
    dataPicker,
    updatePicker,
    handleReset,
    isDateCurrent,
    setOpenMonth,
  } = useCalendar({ value, onChange })

  return (
    <Box w="full" pos="relative" ref={ref}>
      <Flex
        onClick={clickIcon}
        cursor="pointer"
        align="center"
        userSelect="none"
      >
        <Input
          pl={10}
          border="none"
          pointerEvents="none"
          bg={popup ? "accent.500" : "neutral.600"}
          color={popup ? "neutral.900" : value ? "white" : "neutral.400"}
          type="text"
          value={
            value
              ? format(new Date(value), "MMM") +
                " " +
                new Date(value)
                  .getDate()
                  .toLocaleString(undefined, { minimumIntegerDigits: 2 }) +
                ", " +
                new Date(value).getFullYear()
              : "MMM DD, YYYY"
          }
          readOnly
        />
        <Box zIndex={2} pos="absolute" left={0} top={0} h="full">
          <IconButton
            boxSize="40px"
            icon={<SpCalendar />}
            variant="ghost"
            aria-label="open-calendar"
            colorScheme="black"
          />
        </Box>
      </Flex>
      <Box
        pos="absolute"
        overflow="visible"
        zIndex={3}
        top={"100%"}
        left={0}
        transform={"translateY(0.5rem);"}
      >
        <Collapse in={popup} animateOpacity unmountOnExit>
          <Stack spacing={6} direction={["column", "row"]} zIndex="3">
            <Box
              w="300px"
              bg="neutral.700"
              boxShadow={"0px 34px 60px 0px #00000099"}
              rounded="lg"
            >
              <Flex p={2} align="center" userSelect="none" w="full">
                <Displayer
                  title={
                    getMonthName(date.current.getMonth()) +
                    " " +
                    date.current.getFullYear()
                  }
                  onPrevClick={() => swipe("prev")}
                  onNextClick={() => swipe("next")}
                  onTitleClick={() => {
                    clickTitle()
                  }}
                >
                  <Flex flexDir="row" w="full" userSelect="none">
                    {dayName.map((day) => (
                      <Flex
                        key={day}
                        boxSize="2.5rem"
                        align="center"
                        justify="center"
                      >
                        <Text
                          fontSize="xs"
                          color="neutral.400"
                          textTransform="uppercase"
                          fontWeight={600}
                          flexGrow={1}
                          textAlign="center"
                        >
                          {day}
                        </Text>
                      </Flex>
                    ))}
                  </Flex>
                  <Flex w="full" wrap="wrap" userSelect="none">
                    {calendar.map((day) => (
                      <Flex
                        role="group"
                        _hover={{ bg: "accent.500" }}
                        key={day.id}
                        boxSize="2.5rem"
                        align="center"
                        justify="center"
                        rounded="full"
                        cursor="pointer"
                        bg={isDateSelected(day) ? "accent.500" : "transparent"}
                        onClick={() => selectDate(day)}
                      >
                        <Text
                          _groupHover={{
                            color: "neutral.900",
                            fontWeight: 600,
                          }}
                          fontSize="sm"
                          textAlign="center"
                          color={
                            isDateSelected(day)
                              ? "neutral.900"
                              : isDateCurrent(day)
                              ? "accent.500"
                              : day.month === "current"
                              ? "white"
                              : "neutral.400"
                          }
                          fontWeight={isDateSelected(day) ? "600" : "normal"}
                        >
                          {day.value}
                        </Text>
                      </Flex>
                    ))}
                  </Flex>
                </Displayer>
              </Flex>
              <Box px={4} pb={4}>
                <Divider mb={4} />
                <Flex align="center" justify="space-between">
                  <Button
                    onClick={handleReset}
                    _hover={{ bg: "transparent", color: "accent.400" }}
                    bg="none"
                    color="white"
                  >
                    Reset
                  </Button>
                  <Button onClick={doneSelect}>Done</Button>
                </Flex>
              </Box>
            </Box>
            {openMonth && (
              <Flex
                flexDir="column"
                w="300px"
                h="250px"
                overflow="hidden"
                rounded="lg"
                shadow="md"
                bg="neutral.700"
                p={2}
              >
                <Displayer
                  title={
                    getMonthName(date.current.getMonth()) +
                    " " +
                    date.current.getFullYear()
                  }
                  isDisableChevron
                >
                  <Flex flexDir="column" flex={1} w="full">
                    <Flex flexDir="column" flex={1} px={4} py={4}>
                      <MultiPicker
                        selectedValue={dataPicker}
                        onValueChange={(v) => updatePicker(v[0], v[1])}
                      >
                        <Picker indicatorStyle={{ borderLeftRadius: "base" }}>
                          {months.map((month) => (
                            <Picker.Item key={month.id} value={month.id}>
                              {month.name}
                            </Picker.Item>
                          ))}
                        </Picker>
                        <Picker indicatorStyle={{ borderRightRadius: "base" }}>
                          {render24Year()}
                        </Picker>
                      </MultiPicker>
                      <Box px={4}>
                        <Divider mb={4} />
                        <Flex align="center" justify="flex-end">
                          <Button onClick={() => setOpenMonth(false)}>
                            Done
                          </Button>
                        </Flex>
                      </Box>
                    </Flex>
                  </Flex>
                </Displayer>
              </Flex>
            )}
          </Stack>
        </Collapse>
      </Box>
    </Box>
  )
}
