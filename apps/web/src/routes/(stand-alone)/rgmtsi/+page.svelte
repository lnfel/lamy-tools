<script lang="ts">
    import '$lib/app.css'

    import { onMount } from 'svelte'
    import ShortUniqueId from 'short-unique-id'

    /**
     * https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
     */
    function formatBytes(bytes: number, decimals = 2, base10 = false) {
        if (!+bytes) return '0 bytes'
        const k = base10 ? 1000 : 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = base10 ? ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    /**
     * https://stackoverflow.com/questions/66085763/why-currenttarget-value-is-null
     */
    function search(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
        searchTerm = event.currentTarget.value 
        searchFiltered = searchTerm
            ? quotations.filter((item) => item.company.toLowerCase().includes(searchTerm.toLowerCase()))
            : quotations
        result = searchFiltered
    }

    function filterByTag(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
        const tag = event.currentTarget.value
        if (searchTerm) {
            tagFiltered = tag
                ? searchFiltered.reduce((accumulator: RGMTSI.Quotation[], currentvalue) => {
                    if (currentvalue.tags.includes(tag)) {
                        accumulator.push(currentvalue)
                    }
                    return accumulator
                }, [])
                : searchFiltered
            result = tagFiltered
        } else {
            tagFiltered = tag
                ? quotations.filter((item) => item.tags.includes(tag))
                : quotations
            result = tagFiltered
        }
    }

    function resetTagFilter(event: Event & { currentTarget: EventTarget & HTMLButtonElement }) {
        tagFilter.value = ""
        tagFilter.dispatchEvent(new Event('change'))
    }

    let db,
        quotations: RGMTSI.Quotation[] = [],
        searchTerm = "",
        searchFiltered: RGMTSI.Quotation[] = [],
        tagFiltered: RGMTSI.Quotation[] = [],
        tags: string[] = [],
        cacheData: RGMTSI.Quotation[] = [],
        result: RGMTSI.Quotation[] = [];
    let tagFilter: HTMLSelectElement;

    /**
     * https://medium.com/@KevinBGreene/type-safe-indexeddb-using-typescript-declarative-schema-and-codegen-8708f16ca374
     */
    onMount(async () => {
        const uid = new ShortUniqueId()
        const data = [
            {
                id: uid.rnd(),
                company: 'Oleo-Fats',
                tags: ['Baking Equipment'],
                created_at: new Date()
            },
            {
                id: uid.rnd(),
                company: 'Universal Robina',
                tags: ['Mixing Equipment', 'Freezer'],
                created_at: new Date()
            }
        ]

        // tags = [...new Set(data.map((data) => data.tags).flat(1))]

        console.log({ tags })

        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/estimate
         * https://developer.chrome.com/blog/estimating-available-storage-space
         * https://www.raymondcamden.com/2012/08/10/Searching-for-array-elements-in-IndexedDB
         */
        const { usage, quota } = await navigator.storage.estimate()
        console.table({
            Space: `${(Number(quota) / 1000 / 1000).toFixed(2)} MB (${formatBytes(Number(quota), 2, true)})`,
            // totalSpace: quota,
            usedSpace: `${(Number(usage) / Number(quota) * 100).toFixed(2)}%`
        })

        // window.indexedDB.deleteDatabase('RGMTSI-demo')

        const request = window.indexedDB.open('RGMTSI-demo', 1)
        request.onupgradeneeded = async (event) => {
            console.log('[IndexedDB] Initializing Database')
            const db = (event.target as IDBOpenDBRequest).result
            // console.log(event)
            console.log('[IndexedDB] Creating object store schema')
            const objectStore = db.createObjectStore('quotations', { keyPath: 'id' })
            objectStore.createIndex('company', 'company', { unique: false })
            objectStore.createIndex('tags', 'tags', { unique: false, multiEntry: true })

            objectStore.transaction.oncomplete = (event) => {
                console.log('[IndexedDB] Inserting demo data')
                const objectStore = db
                    .transaction(['quotations'], 'readwrite')
                    .objectStore('quotations')
                data.forEach((quotation) => {
                    objectStore.add(quotation)
                })
                // objectStore.getAll().onsuccess = (event) => {
                //     quotations = (event.target as IDBRequest).result
                // }
            }
        }
        request.onerror = () => {
            console.error(request.error)
            console.error("Please allow permission to use IndexedDB.")
        }
        request.onsuccess = async (event) => {
            console.log('[IndexedDB] Operation success')
            db = request.result
            const transaction = db.transaction(['quotations'], "readwrite")
            const objectStore = transaction.objectStore('quotations')
            // https://stackoverflow.com/questions/11492062/sorting-the-results-of-an-indexeddb-query
            // objectStore.index('company').openCursor().onsuccess = (event) => {
            //     console.log(event)
            // }
            objectStore.getAll().onsuccess = (event) => {
                quotations = (event.target as IDBRequest).result
                result = quotations
                cacheData = quotations
                tags = [...new Set(quotations.map((quotation) => quotation.tags).flat(1))]
            }

            // quotations.forEach((quotation) => {
            //     objectStore.add(quotation)
            // })

            // console.log({
            //     db
            // })
        }

        // console.log(await window.indexedDB.databases())
    })

    // $: {
    //     quotations = quotations.filter((item) => item.company.toLowerCase().includes(searchTerm))
    //     console.log(quotations)
    // }
</script>

<main class="h-screen overflow-hidden bg-slate-300 text-slate-800 px-4 py-6 space-y-6">
    <div class="space-y-6">
        <h1 class="text-2xl">RGMTSI - Proof of concept for cloud-based file management</h1>
        <p>This demo showcases core features of the proposed cloud-based application.</p>
    </div>

    <div class="flex flex-col xl:flex-row gap-4">
        <form class="xl:w-3/12 space-y-2">
            <div>
                <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input on:input={search} type="search" id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required autocomplete="off" />
                    <!-- <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> -->
                </div>
            </div>

            <div class="flex items-center gap-2">
                <select bind:this={tagFilter} on:change={filterByTag} id="tags" class="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-[right_0.5rem_center] bg-no-repeat bg-[length:1.5em_1.5em]">
                    <option selected disabled hidden value="">Filter by tag</option>
                    {#each tags as tag}
                        <option value="{tag}">{ tag }</option>
                    {/each}
                </select>

                <button on:click={resetTagFilter} type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Reset
                </button>
            </div>
        </form>

        <div class="flex-grow space-y-4">
            {#each result as q}
                <!-- hour12: true, hour: '2-digit', minute: '2-digit' -->
                <div class="px-4 py-3.5 bg-gray-50 rounded-lg space-y-2">
                    <div>{ q.company }</div>
                    <div class="flex flex-wrap gap-2">
                        {#each q.tags as tag}
                            <span class="text-sm bg-sky-700 text-white rounded px-1 py-0.5">{ tag }</span>
                        {/each}
                    </div>
                    <span class="block text-xs">Created at { q.created_at.toLocaleString('en-CA', {timeZone: 'Asia/Manila', year: 'numeric', month: 'numeric', day: 'numeric'}).toUpperCase().replaceAll(/(,)|([.])/g, '') }</span>
                </div>
            {/each}
        </div>
    </div>
</main>

<style>
    select {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    }
</style>
