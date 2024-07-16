import { PUBLIC_ENVIRONMENT, PUBLIC_LAMY_API_PROD_URL } from "$env/static/public"

export default {
    lamy_api: {
        baseURL: PUBLIC_ENVIRONMENT.toLowerCase() === 'production'
            ? PUBLIC_LAMY_API_PROD_URL
            : 'http://localhost:3000/'
        // baseURL: PUBLIC_LAMY_API_PROD_URL ?? 'http://localhost:3000/'
    }
}
