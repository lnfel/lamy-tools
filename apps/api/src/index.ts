import { Elysia, t } from "elysia"
import { cors } from '@elysiajs/cors'
import { staticPlugin } from '@elysiajs/static'
import sharp from "sharp"

export const app = new Elysia()
    .use(await staticPlugin())
    .use(cors())
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
