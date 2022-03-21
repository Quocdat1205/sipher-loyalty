import { chakra } from "@sipher.dev/sipher-ui"

interface TimeCellProps {
  value: number
  unit: "D" | "H" | "M" | "S"
}

const TimeCell = ({ value, unit }: TimeCellProps) => {
  return (
    <chakra.span>
      {value}
      {unit}
    </chakra.span>
  )
}

export default TimeCell
