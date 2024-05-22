export default {
    app_url: process.env.NODE_ENV === 'production' ? process.env.APP_URL_PROD : process.env.APP_URL_DEV
}
