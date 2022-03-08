import { useEffect, useState } from "react"

export const usePasswordValidation = ({ firstPassword = "", secondPassword = "", requiredLength = 8 }) => {
  const [validLength, setValidLength] = useState<boolean>()
  const [hasNumber, setHasNumber] = useState<boolean>()
  const [upperCase, setUpperCase] = useState<boolean>()
  const [specialChar, setSpecialChar] = useState<boolean>()
  const [match, setMatch] = useState<boolean>()

  useEffect(() => {
    setValidLength(firstPassword.length >= requiredLength ? true : false)
    setUpperCase(firstPassword.toLowerCase() !== firstPassword)
    setHasNumber(/\d/.test(firstPassword))
    setMatch(secondPassword !== "" && firstPassword === secondPassword)
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(firstPassword))
  }, [firstPassword, secondPassword, requiredLength])

  return [validLength, hasNumber, upperCase, match, specialChar]
}
