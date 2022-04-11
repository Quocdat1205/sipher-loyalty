import { useEffect, useState } from "react"
import { City, Country, State } from "country-state-city"

interface SelectType {
  state: Record<string, any> | null
  city: Record<string, any> | null
  country: Record<string, any> | null
}

const initSelectValue: SelectType = {
  state: null,
  city: null,
  country: null,
}

const useShipping = () => {
  const [selectValue, setSelectValue] = useState(initSelectValue)

  useEffect(() => {
    setSelectValue({ country: selectValue.country, state: null, city: null })
  }, [selectValue.country])

  useEffect(() => {
    setSelectValue({ country: selectValue.country, state: selectValue.state, city: null })
  }, [selectValue.state])

  const country = Country.getAllCountries()
  const state = State.getStatesOfCountry(selectValue.country?.isoCode) || []
  const city = City.getCitiesOfState(selectValue.country?.isoCode, selectValue.state?.isoCode) || []

  return { state, city, country, selectValue, setSelectValue }
}

export default useShipping
