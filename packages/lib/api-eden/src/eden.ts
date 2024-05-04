import { edenTreaty, edenFetch, treaty } from '@elysiajs/eden'
// import { app } from 'api'
import type { App } from 'api'

export const api = edenTreaty<App>('http://0.0.0.0:3000/')
// export const api = treaty(app)
// export const api = {}
export const apiTreaty = treaty<App>('http://0.0.0.0:3000/')
export const fetch = edenFetch<App>('http://0.0.0.0:3000/')
