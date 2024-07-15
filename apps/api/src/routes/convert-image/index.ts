import { Elysia, t } from 'elysia'
import sharp from "sharp"
import { ImageFormatSchema, FormDataType, ImageFormat } from '../../types'
import { convert } from '../../lib'

const route = new Elysia({ name: 'routes:convert-image', prefix: '/image' })
    // .options('/*', ({ set }) => {
    //     set.status = "OK"
    // })
    // .model({
    //     'convert-image:body': t.Object({
    //         data: t.Files({ maxItems: 5, maxSize: '10m' })
    //     }),
    //     'convert-image:query': t.Object({
    //         format: ImageFormatSchema
    //     })
    // })
    // .post('/sample', () => {
    //     return 'Hey'
    // })
    /**
     * Cannot use scalar UI for multipart upload
     * https://github.com/elysiajs/elysia-swagger/issues/67
     * 
     * @see {@link https://swagger.io/docs/specification/describing-request-body/multipart-requests/ | Multipart Request}
     */
    .post('/convert', async ({ body: { image }, query: { format = "png" as ImageFormat.png } }) => {
        console.log({
            image,
            format
        })
        const formData = new FormData()
        await Promise.all(image.map(async (data) => {
            const image = sharp(await data.arrayBuffer())
            const file = await convert[format]({ sharp: image, filename: data.name, metadata: await image.metadata(), options: {} })
            formData.append('image', new Blob([await file.arrayBuffer()], { type: file.type }), file.name)
            return file
        }))
        return formData
    }, {
        type: "multipart/form-data",
        body: t.Object({
            image: t.Files({ maxItems: 5, maxSize: '10m', type: ["image"] })
        }),
        query: t.Object({
            format: ImageFormatSchema
        }),
        detail: {
            tags: ['Image']
        },
        // This breaks CORS
        // response: {
        //     200: t.Unsafe<FormData>({
        //         title: 'Successful response',
        //         default: 'FormData',
        //         type: 'FormData',
        //         description: 'FormData containing one or more image fields(s)'
        //     }),
        // },
    })

export default route
