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
        // return await image.arrayBuffer()
        // return image
    })
    .post('/upload', async ({ body: { image }, set }) => {
        console.log({ image, name: image.name })
        // set.headers = {
        //     "Content-Disposition": `filename="${image.name}"`,
        //     "Content-Type": image.type
        // }

        const formData = new FormData()
        formData.append('image', new Blob([await image.arrayBuffer()], { type: image.type }), image.name)
        return formData
        // return new Response(formData)
        // return new Response(Buffer.from(await image.arrayBuffer()))

        // return new Blob([await image.arrayBuffer()], { type: image.type })
        // return new Response(new Blob([await image.arrayBuffer()], { type: image.type }), {
        //     headers: {
        //         "Content-Disposition": `filename='${image.name}'`,
        //         "Content-Type": image.type
        //     }
        // })
        // return image
    }, {
        body: t.Object({
            image: t.File()
        }),
        afterHandle(context) {
            console.log(context.response)
        }
    })
    .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type App = typeof app
