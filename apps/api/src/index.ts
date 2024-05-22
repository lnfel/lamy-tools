import { Elysia, t } from "elysia"
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { staticPlugin } from '@elysiajs/static'
import routes from "./routes"
import config from "./lib/config"

export const app = new Elysia({ name: 'app' })
    .use(await staticPlugin())
    .use(swagger({
        path: '/docs',
        documentation: {
            tags: [
                { name: 'Image', description: 'Endpoints for processing images.' }
            ]
        }
    }))
    .use(cors({
        // origin: ({ headers }) => {
        //     console.log({
        //         origin: headers.get('Origin'),
        //         app_url: config.app_url
        //     })
        //     return headers.get('Origin') === config.app_url
        // },
        origin: config.app_url.replace('http://', ''),
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
        exposedHeaders: '*',
        methods: '*',
        preflight: true
    }))
    .use(routes)
    .get('/health', () => {
        return {
            message: 'Lamy is healthy!'
        }
    })
    .get("/", async ({ set }) => {
        const image = Bun.file('public/suisei_august_2023.webp')
        // const imageSharp = await sharp(await image.arrayBuffer())
        //     .webp()
        //     .toBuffer()
        set.headers = {
            "Content-Disposition": `filename="${image.name}"`,
            "Content-Type": image.type
        }
        // return imageSharp
        return new Blob([await image.arrayBuffer()], { type: image.type })
    })
    .post('/upload', async ({ body: { image }, set }) => {
        const formData = new FormData()
        formData.append('image', new Blob([await image.arrayBuffer()], { type: image.type }), image.name)
        return formData
    }, {
        body: t.Object({
            image: t.File()
        })
    })
    .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type App = typeof app
