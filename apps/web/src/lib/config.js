/**
 * Do not forget to add PUBLIC_* and <SOME_PRIVATE_ENV> in turbo.json file
 * ```
 * "tasks": {
 *      "build": {
 *          "env": ["PUBLIC_*", "SOME_PRIVATE_ENV"]
 *      }
 * }
 * ```
 */
import { PUBLIC_ENVIRONMENT, PUBLIC_LAMY_API_PROD_URL } from "$env/static/public"

export default {
    lamy_api: {
        baseURL: PUBLIC_ENVIRONMENT.toLowerCase() === 'production'
            ? PUBLIC_LAMY_API_PROD_URL
            : 'http://localhost:3000/'
        // baseURL: process.env?.PUBLIC_LAMY_API_PROD_URL ?? 'http://localhost:3000/'
    }
}
