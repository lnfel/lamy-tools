import { Elysia, t } from 'elysia'
import sharp from "sharp"
import { ImageFormatSchema } from '#types'
import { convert } from '#lib'

const route = new Elysia({ name: 'routes:convert-image', prefix: '/convert-image' })
    .post('', async ({ body: { data }, query: { format } }) => {
        console.log({
            data,
            format
        })
        const formData = new FormData()
        await Promise.all(data.map(async (data) => {
            const image = sharp(await data.arrayBuffer())
            const file = await convert[format]({ sharp: image, filename: data.name, metadata: await image.metadata(), options: {} })
            formData.append('image', new Blob([await file.arrayBuffer()], { type: file.type }), file.name)
            return file
        }))
        return formData
    }, {
        body: t.Object({
            data: t.Files({ maxItems: 5, maxSize: '10m' })
        }),
        query: t.Object({
            format: ImageFormatSchema
        })
    })

export default route
