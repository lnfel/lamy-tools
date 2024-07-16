/**
 * For some reason importing methods from @elysiajs/eden causes the following error:
 * ```md
 * > Types have separate declarations of a private property 'dependencies'.
 * ```
 * Possibly due to private class property named dependencies cannot be compared as equal between two separate class instances.
 * @see {@link https://medium.com/@tobygstimpson/typescript-classes-access-modifiers-50900176dd57 | TypeScript Classes — Access Modifiers}
 * 
 * Solution is to install @elysiajs/eden in api workspace and import from there using relative path >.<
 * ../../../apps/api/node_modules/@elysiajs/eden
 */
import { edenTreaty, edenFetch, treaty as treaty2 } from '@elysiajs/eden'
import type { App } from 'api'
import type {} from 'api/src/types/schema'
import type {} from '@elysiajs/eden/treaty'

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
     * : ReturnType<typeof edenTreaty<App>>
     * 
     * [TS Bug SOLVED]: Set "stripInternal": true in tsconfig compilerOptions
     * https://github.com/typescript-eslint/typescript-eslint/issues/7605#issuecomment-1732471255
     * 
     * Fixes https://github.com/microsoft/TypeScript/issues/47663
     * 
     * @internal
     */
    edenTreaty() {
        //@ts-ignore
        return edenTreaty<App>(this.domain)
    }

    treaty() {
        //@ts-ignore
        return treaty2<App>(this.domain.replace('http://', '').replace('https://', ''), {
            async onRequest(path, options) {
                if (path.startsWith('/image/convert')) {
                    console.log({
                        path,
                        options
                    })

                    if (options.body instanceof FormData) {
                        console.log(options.body.getAll('image'))
                    }
                    // console.log(options.body?.image?.getAll('image'))
                }
            },
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
     * 
     * : ReturnType<typeof edenFetch<App>>
     */
    fetch() {
        //@ts-ignore
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
 * 
 * : ReturnType<typeof edenTreaty<App>>
 * 
 */
//@ts-ignore
export const api = edenTreaty<App>('http://localhost:3000/')
//@ts-ignore
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
 * 
 * : ReturnType<typeof edenFetch<App>>
 */
//@ts-ignore
export const fetch = edenFetch<App>('http://localhost:3000/')
