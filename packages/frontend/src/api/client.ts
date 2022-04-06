import { Api } from "./sdk"

const baseURL = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:5500" //"https://api-loyalty.sipher.gg/"

const client = new Api({
  format: "json",
  baseURL,
})

export default client
