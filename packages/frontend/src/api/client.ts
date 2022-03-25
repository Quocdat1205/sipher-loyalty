import { Api } from "./sdk"

const baseURL = "https://api-loyalty.sipher.gg/"
// const baseURL = "http://localhost:5500"

const client = new Api({
  format: "json",
  baseURL,
})

export default client
