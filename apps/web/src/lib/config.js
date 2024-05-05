import { LAMY_API_PROD_URL, ENVIRONMENT } from "$env/static/private"

export default {
    lamy_api: {
        baseURL: ENVIRONMENT.toLowerCase() === 'production'
            ? LAMY_API_PROD_URL
            : 'http://0.0.0.0:3000/'
    }
}
