<script lang="ts">
    import { enhance } from "$app/forms"
    import { api } from 'api-eden'

    import type { SubmitFunction } from "@sveltejs/kit"

    const upload: SubmitFunction = async ({ formData, cancel }) => {
        const response = await api.upload.post({
            getRaw: true,
            $fetch: {
                mode: 'cors'
            },
            image: formData.get('file') as File | FileList,
        }) as unknown as Response

        // console.log((await response.formData()).get('image'))
        preview.src = URL.createObjectURL((await response.formData()).get('image') as Blob)
        cancel()
    }

    let preview: HTMLImageElement
</script>

<form use:enhance={upload} method="post" enctype="multipart/form-data">
    <input type="file" name="file" multiple />
    <button>Submit</button>
</form>

<!-- svelte-ignore a11y-missing-attribute -->
<img bind:this={preview} class="h-96" />
