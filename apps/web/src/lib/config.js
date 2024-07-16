import { PUBLIC_LAMY_API_PROD_URL } from "$env/static/public"

export default {
    lamy_api: {
        // baseURL: ENVIRONMENT.toLowerCase() === 'production'
        //     ? LAMY_API_PROD_URL
        //     : 'http://localhost:3000/'
        baseURL: PUBLIC_LAMY_API_PROD_URL ?? 'http://localhost:3000/'
    }
}
