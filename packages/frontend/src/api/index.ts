import { baseURL } from "./config";
import axios from "axios";

export const fetcher = axios.create({ baseURL });

export * from "./auth";
