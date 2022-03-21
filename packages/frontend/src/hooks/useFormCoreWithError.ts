import { useCallback, useMemo, useReducer } from "react"

interface IOption {
  clearErrorOnValueChange: boolean
}

type SetAction = {
  type: "SET"
  field: string
  value: any
}

type InitAction<T> = {
  type: "INIT"
  payload: T
}

export const useFormCoreWithError = <IForm extends Record<string, any>>(
  initialValues: IForm,
  options: IOption = {
    clearErrorOnValueChange: true,
  },
) => {
  type Action<T> = SetAction | InitAction<T>
  type IFormError = Record<keyof IForm, string>

  const memoizedValues = useMemo(() => initialValues, [initialValues])
  const initialError: IFormError = useMemo(
    () => Object.assign({}, ...Object.keys(memoizedValues).map(key => ({ [key]: "" }))),
    [memoizedValues],
  )

  // generate reducer base on initial value input
  const genReducer = <P extends Record<string, any>>(initValues: P): [(state: P, action: Action<P>) => P, P] => {
    const reducer = (state: P, action: Action<P>) => {
      switch (action.type) {
        case "SET":
          return {
            ...state,
            [action.field]: action.value,
          }
        case "INIT":
          return action.payload
        default:
          return state
      }
    }
    return [reducer, initValues]
  }

  const [values, dispatch] = useReducer(...genReducer<IForm>(initialValues))

  const [errors, dispatchError] = useReducer(...genReducer<IFormError>(initialError))

  const setError = useCallback(
    (field: keyof IFormError, value: string) => dispatchError({ type: "SET", field: field as string, value }),
    [dispatchError],
  )
  const setValue = useCallback(
    (field: keyof IForm, value: any) => {
      dispatch({ type: "SET", field: field as string, value })
      if (options.clearErrorOnValueChange) setError(field, "")
    },
    [dispatch, setError, options.clearErrorOnValueChange],
  )

  const initForm = useCallback(
    (payload: IForm = memoizedValues) => {
      dispatch({ type: "INIT", payload })
      dispatchError({ type: "INIT", payload: initialError })
    },
    [dispatch, dispatchError, initialError, memoizedValues],
  )

  return { values, setValue, initForm, errors, setError }
}

export default useFormCoreWithError
