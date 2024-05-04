import { t } from 'elysia'
import { api } from 'lib'

export const actions = {
    /**
     * Uploading a file using Eden Treaty
     * 
     * We get the right response data only when setting `getRaw` option to true.
     * This way we can access the FormData, otherwise eden would transform it into
     * an incomprehensible binary data.
     * 
     * The only issue with using svelte server action is that we cannot respond back with non-POJO
     * data (Blob etc...). `URL.createObjectURL` cannot be used as well since it will generate node url
     * because of server context. We can technically store the image temporarily on a remote storage
     * and return the url instead but it is not desirable as bots might abuse the API.
     * 
     * NOTE: We are doing this on the client side instead.
     * 
     * @see {@link https://elysiajs.com/eden/treaty/legacy.html | Eden Treaty}
     */
    default: async ({ request }) => {
        const formData = await request.formData()
        const image = formData.get('file') as File | FileList

        const response = await api.upload.post({
            getRaw: true,
            image: image,
        }) as unknown as Response
        console.log({
            // data: (await response?.formData())?.get('image'),
            response,
            headers: response.headers
        })

        for (const pair of response.headers?.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`)
        }

        return {
            url: URL.createObjectURL((await response?.formData()).get('image') as Blob)
        }
    }
}