/**
 * For some reason importing methods from @elysiajs/eden causes the following error:
 * ```md
 * > Types have separate declarations of a private property 'dependencies'.
 * ```
 * Possibly due to private class property named dependencies cannot be compared as equal between two separate class instances.
 * @see {@link https://medium.com/@tobygstimpson/typescript-classes-access-modifiers-50900176dd57 | TypeScript Classes — Access Modifiers}
 * 
 * Fixed by re-installing api workspace via `pnpm add api`
 */
import { edenTreaty, edenFetch, treaty as treaty2 } from '@elysiajs/eden'
import type { App } from 'api'

export class LamyAPI {
    domain

    constructor(domain = 'http://localhost:3000/') {
        this.domain = domain
    }

    /**
     * Error:
     * ```md
     * > The inferred type of 'edenTreaty' cannot be named without a reference to '../node_modules/@elysiajs/eden/dist/types-DcP_1Cpm'. This is likely not portable. A type annotation is necessary.
     * ```
     * One of the solution is to type annotate the thing:
     * https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189
     */
    edenTreaty(): ReturnType<typeof edenTreaty<App>> {
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
     * 
     * One of the solution is to type annotate the thing:
     * https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189
     */
    fetch(): ReturnType<typeof edenFetch<App>> {
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
 * 
 * One of the solution is to type annotate the thing:
 * https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189
 */
export const api: ReturnType<typeof edenTreaty<App>> = edenTreaty<App>('http://localhost:3000/')
export const treaty = treaty2<App>('localhost:3000')
/**
 * [TS Bug SOLVED]: Set "stripInternal": true in tsconfig compilerOptions
 * https://github.com/typescript-eslint/typescript-eslint/issues/7605#issuecomment-1732471255
 * 
 * Fixes https://github.com/microsoft/TypeScript/issues/47663
 * 
 * @internal
 * 
 * One of the solution is to type annotate the thing:
 * https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189
 */
export const fetch: ReturnType<typeof edenFetch<App>> = edenFetch<App>('http://localhost:3000/')
