import { Api } from "./sdk"

const baseURL = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "https://api-loyalty.sipher.gg/"

const client = new Api({
  format: "json",
  baseURL,
})

export default client
