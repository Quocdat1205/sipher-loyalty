export const usePasswordStrength = (password, minimumLength = 8) => {
  const calculatePasswordStrength = (password: string) => {
    const strength = {
      validLength: password.length >= minimumLength,
      upperCase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    }

    if (!strength.validLength) return 1
    else return Object.values(strength).filter(v => v).length
  }

  return calculatePasswordStrength(password)
}
