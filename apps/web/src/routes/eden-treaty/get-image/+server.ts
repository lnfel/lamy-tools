import { api } from 'api-eden'

export const GET = async ({ setHeaders }) => {
    const response = await api.index.get({
        getRaw: true
    })
    // const { data, response, headers } = await api.index.get({
    //     // headers: {
    //     //     "Accept": "image/*"
    //     // }
    // })
    // const result = await fetch('http://localhost:3000')
    // console.log(await result.blob())
    // console.log({
    //     headers,
    //     data,
    // })
    // for (const pair of headers?.entries()) {
    //     console.log(`${pair[0]}: ${pair[1]}`)
    // }

    // const uInt8Array = Uint8Array.from(data, c => c.charCodeAt(0))
    // const blob = new Blob([uInt8Array], { type: headers?.get('content-type') })
    // console.log({
    //     uInt8Array,
    //     blob,
    // })
    // return new Response(blob, {
    //     headers
    // })

    // const blob = new Blob([data], { type: headers?.get('content-type') })
    // console.log({
    //     blob,
    // })
    // return new Response(blob, {
    //     headers
    // })

    // return new Response(data, {
    //     headers
    // })

    return response as unknown as Response
}

// export const GET = async () => {
//     const response = await fetch('/test', {})
//     console.log({ ...response })
//     return new Response()
//     // return new Response(JSON.stringify({ message: response.error.toString() }))
//     // return new Response(response.data, {
//     //     headers
//     // })
// }
