import { Elysia, t } from "elysia"
import { cors } from '@elysiajs/cors'
import sharp from "sharp"

export const app = new Elysia()
    .use(cors())
    .get("/test", () => "Hi")
    .get("/", async ({ set }) => {
        const image = Bun.file('suisei_august_2023.webp')
        // const imageSharp = await sharp(await image.arrayBuffer())
        //     .webp()
        //     .toBuffer()
        set.headers = {
            // "Accept-Ranges": "bytes",
            "Content-Disposition": `filename="${image.name}"`,
            // "Content-Length": image.size.toString(),
            // "Content-Range": `0-${image.size - 1}/${image.size}`,
            "Content-Type": image.type
            // "Content-Type": 'application/octet-stream'
        }
        // set.headers = {
        //     "Content-Type": image.type
        // }
        // return imageSharp
        // return new File([await image.arrayBuffer()], `some-image.${image.type.replace('image/', '')}`)
        return new Blob([await image.arrayBuffer()], { type: image.type })
        // return await image.arrayBuffer()
        // return image
    }, {
        // response: {
        //     200: t.File()
        // }
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
