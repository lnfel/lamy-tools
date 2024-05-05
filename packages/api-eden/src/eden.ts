import { edenTreaty, edenFetch, treaty } from '@elysiajs/eden'
// import { app } from 'api'
import type { App } from 'api'

export class LamyAPI {
    domain

    constructor(domain = 'http://0.0.0.0:3000/') {
        this.domain = domain
    }

    edenTreaty() {
        return edenTreaty<App>(this.domain)
    }

    treaty() {
        return treaty<App>(this.domain)
    }

    fetch() {
        return edenFetch<App>(this.domain)
    }
}

export const api = edenTreaty<App>('http://0.0.0.0:3000/')
// export const api = treaty(app)
// export const api = {}
export const apiTreaty = treaty<App>('http://0.0.0.0:3000/')
export const fetch = edenFetch<App>('http://0.0.0.0:3000/')
