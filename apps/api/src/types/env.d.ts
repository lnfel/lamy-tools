declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined
            NODE_ENV: string
            APP_URL_DEV: string
            APP_URL_PROD: string
        }
    }
}

export {}
