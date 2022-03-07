import React from "react"

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

export const Form = (props: Props) => {
  return <form {...props} />
}
