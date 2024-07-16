import type {} from "@elysiajs/eden"
import { LamyAPI } from "api-eden"
import config from "$lib/config"

/**
 * https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1270716220
 * https://github.com/quadristan/ts-indirect-type-reference-bug
 * 
 * One of the solution is to type annotate the thing:
 * https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189
 * 
 * : ReturnType<typeof LamyAPI.prototype.edenTreaty>
 * 
 * [TS Bug SOLVED]: Set "stripInternal": true in tsconfig compilerOptions
 * https://github.com/typescript-eslint/typescript-eslint/issues/7605#issuecomment-1732471255
 * 
 * Fixes https://github.com/microsoft/TypeScript/issues/47663
 * 
 * @internal
 */
export const api = new LamyAPI(config.lamy_api.baseURL)
    .edenTreaty()

export const treaty = new LamyAPI(config.lamy_api.baseURL)
    .treaty()
