<script lang="ts">
	import { enhance } from '$app/forms'
    // import { api } from 'api-eden'
	import { api, apiTreaty } from '../../../../lib/lamy-api/index.js'
    import type { ImageFormatSchema } from 'api/src/types/schema'

	import type { SubmitFunction } from '@sveltejs/kit'

    const formatOptions = ['PNG', 'WEBP', 'JPEG']

	const upload: SubmitFunction = async ({ formData, cancel }) => {
        formData.delete('format')
        // const treatyResponse = await apiTreaty.image.convert.post({
        //     image: formData.getAll('image') as unknown as File | FileList
        // }, {
        //     query: {
        //         format: format.value as typeof ImageFormatSchema.static
        //     }
        // })

        // console.log(treatyResponse.data)

		const response = (await api.image.convert.post({
			getRaw: true,
            // $fetch: {
            //     mode: 'no-cors', // We get wrong MIME-TYPE when we have mode enabled or $fetch assigned...
            //     // body: formData
            // },
			image: formData.getAll('image') as unknown as File | FileList,
            $query: {
                format: format.value as typeof ImageFormatSchema.static
            },
		})) as unknown as Response;

		const images = (await response.formData()).getAll('image') as File[];
        images.forEach((image) => {
            previews = [
                ...previews,
                {
                    name: image.name,
                    src: URL.createObjectURL(image)
                }
            ]
        })
		// console.log({
		// 	images
		// })

        // https://github.com/elysiajs/eden/issues/95
        // const { data, response } = await apiTreaty.image.convert.post({
        //     image: formData.getAll('image') as unknown as File | FileList
        // }, {
        //     query: {
        //         format: format.value as typeof ImageFormatSchema.static
        //     },
        // })
        // console.log({ data })
		cancel()
	}

    let format: HTMLSelectElement
    let previews: { name: string, src: string }[] = []
</script>

<form use:enhance={upload} method="post" enctype="multipart/form-data">
    <select bind:this={format} name="format">
        {#each formatOptions as option}
            <option value={option.toLowerCase()}>{ option }</option>
        {/each}
    </select>
	<input type="file" name="image" multiple accept="image/*" />
	<button>Submit</button>
</form>

<div class="preview">
    {#each previews as { src, name }}
        <img {src} alt={name} />
        <a href={src} download={name}>Download</a>
    {/each}
</div>
