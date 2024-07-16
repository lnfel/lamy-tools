/**
 * For some reason importing methods from @elysiajs/eden causes the following error:
 * ```md
 * > Types have separate declarations of a private property 'dependencies'.
 * ```
 * Possibly due to private class property named dependencies cannot be compared as equal between two separate class instances.
 * @see {@link https://medium.com/@tobygstimpson/typescript-classes-access-modifiers-50900176dd57 | TypeScript Classes — Access Modifiers}
 */
import { edenTreaty, edenFetch, treaty as treaty2 } from 'api/node_modules/@elysiajs/eden'
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
        return treaty2<App>(this.domain.replace('http://', '').replace('https://', ''), {
            async onResponse(response) {
                const contentType = response.headers.get('Content-Type')
                if (contentType?.includes('multipart/form-data')) {
                    const formData = await response.formData()
                    if (formData.has('image')) {
                        return formData.getAll('image')
                    }
                }
            }
        })
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
