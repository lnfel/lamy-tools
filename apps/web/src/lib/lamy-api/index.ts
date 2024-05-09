import { LamyAPI } from "api-eden"
import config from "$lib/config"

/**
 * [TS Bug SOLVED]: Set "stripInternal": true in tsconfig compilerOptions
 * https://github.com/typescript-eslint/typescript-eslint/issues/7605#issuecomment-1732471255
 * 
 * Fixes https://github.com/microsoft/TypeScript/issues/47663
 * 
 * @internal
 */
export const api = new LamyAPI(config.lamy_api.baseURL)
    .edenTreaty()
