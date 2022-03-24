import { Api } from "./sdk"

const baseURL = "https://api-loyalty.sipher.gg/"

const client = new Api({
  format: "json",
  baseURL,
})

export default client
