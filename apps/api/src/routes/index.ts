import { Elysia } from 'elysia'
import convertImage from './convert-image'
import osuchan from './osuchan'

const route = new Elysia({ name: 'routes:index' })
    .use(convertImage)
    .use(osuchan)

export default route
