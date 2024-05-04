import { Elysia } from "elysia"
import sharp from "sharp"

const app = new Elysia()
    .get("/", async ({ set }) => {
        const image = Bun.file('suisei_august_2023.webp')
        // const imageSharp = await sharp(await image.arrayBuffer())
        //     .webp()
        //     .toBuffer()
        set.headers = {
            "Content-Type": image.type
        }
        // return imageSharp
        return new File([await image.arrayBuffer()], `some-image.${image.type.replace('image/', '')}`)
    })
    .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type App = typeof app
