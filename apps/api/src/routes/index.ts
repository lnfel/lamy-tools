import { Elysia } from 'elysia'
import convertImage from './convert-image'

const route = new Elysia({ name: 'routes:index' })
    .use(convertImage)

export default route
