<script lang="ts">
	import { enhance } from '$app/forms'
    // import { api } from 'api-eden'
	import { api } from '../../../../lib/lamy-api/index'

	import type { SubmitFunction } from '@sveltejs/kit'

    const formatOptions = ['PNG', 'WEBP', 'JPEG']

	const upload: SubmitFunction = async ({ formData, cancel }) => {
		const response = (await api.image.convert.post({
			getRaw: true,
			data: formData.getAll('image') as unknown as File | FileList,
            $query: {
                format: format.value 
            }
		})) as unknown as Response;

		const images = (await response.formData()).getAll('image') as Blob[];
        images.forEach((image) => {
            previews = [
                ...previews,
                {
                    name: image.name,
                    src: URL.createObjectURL(image)
                }
            ]
        })
		console.log({
			images
		});
		cancel();
	};

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
