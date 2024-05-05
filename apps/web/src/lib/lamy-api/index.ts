import { LamyAPI } from "api-eden"
import config from "$lib/config"

export const api = new LamyAPI(config.lamy_api.baseURL)
    .edenTreaty()
