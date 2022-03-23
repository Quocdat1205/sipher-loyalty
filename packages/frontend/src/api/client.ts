import { Api } from "./sdk"

const baseURL = "https://beloyalty.sipherion.com/"

const client = new Api({
  format: "json",
  baseURL,
})

export default client
