import axios from "axios"

import { baseURL } from "./config"

export const fetcher = axios.create({ baseURL })
