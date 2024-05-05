import { api } from 'api-eden'

export const GET = async ({ setHeaders }) => {
    // const { data, response, headers } = await api.index.get({
    //     // headers: {
    //     //     "Accept": "image/*"
    //     // }
    // })

    // return new Response(data, {
    //     headers
    // })

    /**
     * EdenTreaty (Legacy)
     */
    const response = await api.index.get({
        getRaw: true
    })
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
