import { edenTreaty, edenFetch, treaty as treaty2 } from '@elysiajs/eden'
// import { app } from 'api'
import type { App } from 'api'

export class LamyAPI {
    domain

    constructor(domain = 'http://localhost:3000/') {
        this.domain = domain
    }

    /**
     * [TS Bug SOLVED]: Set "stripInternal": true in tsconfig compilerOptions
     * https://github.com/typescript-eslint/typescript-eslint/issues/7605#issuecomment-1732471255
     * 
     * Fixes https://github.com/microsoft/TypeScript/issues/47663
     * 
     * @internal
     */
    edenTreaty() {
        return edenTreaty<App>(this.domain)
    }

    treaty() {
        return treaty2<App>(this.domain.replace('http://', '').replace('https://', ''))
    }

    /**
     * [TS Bug SOLVED]: Set "stripInternal": true in tsconfig compilerOptions
     * https://github.com/typescript-eslint/typescript-eslint/issues/7605#issuecomment-1732471255
     * 
     * Fixes https://github.com/microsoft/TypeScript/issues/47663
     * 
     * @internal
     */
    fetch() {
        return edenFetch<App>(this.domain)
    }
}

/**
 * [TS Bug SOLVED]: Set "stripInternal": true in tsconfig compilerOptions
 * https://github.com/typescript-eslint/typescript-eslint/issues/7605#issuecomment-1732471255
 * 
 * Fixes https://github.com/microsoft/TypeScript/issues/47663
 * 
 * @internal
 */
export const api = edenTreaty<App>('http://localhost:3000/')
// export const api = treaty(app)
// export const api = {}
export const treaty = treaty2<App>('localhost:3000')
/**
 * [TS Bug SOLVED]: Set "stripInternal": true in tsconfig compilerOptions
 * https://github.com/typescript-eslint/typescript-eslint/issues/7605#issuecomment-1732471255
 * 
 * Fixes https://github.com/microsoft/TypeScript/issues/47663
 * 
 * @internal
 */
export const fetch = edenFetch<App>('http://localhost:3000/')
