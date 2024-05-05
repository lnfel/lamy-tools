import { Elysia, t } from "elysia"
import { cors } from '@elysiajs/cors'
import { staticPlugin } from '@elysiajs/static'
import sharp from "sharp"

export const app = new Elysia()
    .use(staticPlugin())
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
        // return await image.arrayBuffer()
        // return image
    })
    .post('/upload', async ({ body, set }) => {
        console.log({ body })
        // set.headers = {
        //     "Content-Disposition": `filename="${body.image.name}"`,
        //     "Content-Type": body.image.type
        // }
        const formData = new FormData()
        formData.append('image', body.image)
        // return new Blob([await body.image.arrayBuffer()], { type: body.image.type })
        // return body.image
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
