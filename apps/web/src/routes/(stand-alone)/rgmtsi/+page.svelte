<script lang="ts">
    import '$lib/app.css'

    import { onMount } from 'svelte'
    import ShortUniqueId from 'short-unique-id'

    import DateRange from '$lib/rgmtsi/DateRange.svelte'
    import { getLocalTimeZone } from '@internationalized/date'
    import type { DateValue } from '@internationalized/date'
    import type { DateRange as DateRangeType } from '@melt-ui/svelte'

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
        searchTerm = event.currentTarget.value.toLowerCase()

        if (!start && !end && tagFilter.value === "") {
            searchFiltered = searchTerm
                ? quotations.reduce((accumulator: RGMTSI.Quotation[], currentvalue) => {
                    if (currentvalue.company.toLowerCase().includes(searchTerm.toLowerCase())) {
                        accumulator.push(currentvalue)
                    }
                    return accumulator
                }, [])
                : quotations
            result = searchFiltered
        }

        // if (start && end) {
        //     searchFiltered = searchTerm
        //         ? dateFiltered.reduce((accumulator: RGMTSI.Quotation[], currentvalue) => {
        //             if (currentvalue.company.toLowerCase().includes(searchTerm.toLowerCase())) {
        //                 accumulator.push(currentvalue)
        //             }
        //             return accumulator
        //         }, [])
        //         : dateFiltered
        //     result = searchFiltered
        // }

        if (tagFilter.value !== "") {
            searchFiltered = searchTerm
                ? tagFiltered.reduce((accumulator: RGMTSI.Quotation[], currentvalue) => {
                    if (currentvalue.company.toLowerCase().includes(searchTerm.toLowerCase())) {
                        accumulator.push(currentvalue)
                    }
                    return accumulator
                }, [])
                : tagFiltered
            result = searchFiltered
        }
    }

    function filterByTag(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
        const tag = event.currentTarget.value
        if (!start && !end && !searchTerm) {
            tagFiltered = tag
                ? quotations.reduce((accumulator: RGMTSI.Quotation[], currentvalue) => {
                    if (currentvalue.tags.includes(tag)) {
                        accumulator.push(currentvalue)
                    }
                    return accumulator
                }, [])
                : quotations
            result = tagFiltered
        }

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
        }
        
        // if (start && end) {
        //     tagFiltered = tag
        //         ? dateFiltered.reduce((accumulator: RGMTSI.Quotation[], currentvalue) => {
        //             if (currentvalue.tags.includes(tag)) {
        //                 accumulator.push(currentvalue)
        //             }
        //             return accumulator
        //         }, [])
        //         : dateFiltered
        //     result = tagFiltered
        // }
    }

    function resetTagFilter(event: Event & { currentTarget: EventTarget & HTMLButtonElement }) {
        tagFilter.value = ""
        tagFilter.dispatchEvent(new Event('change'))
    }

    function filterByDate({ detail: { start, end } }: CustomEvent<DateRangeType>) {
        const startDate = start?.toDate(getLocalTimeZone())
        const endDate = end?.toDate(getLocalTimeZone())
        endDate?.setHours(24)
        // if (searchTerm) {
        //     dateFiltered = startDate && endDate
        //         ? searchFiltered.reduce((accumulator: RGMTSI.Quotation[], currentvalue) => {
        //             if (currentvalue.created_at >= startDate && currentvalue.created_at <= endDate) {
        //                 accumulator.push(currentvalue)
        //             }
        //             return accumulator
        //         }, [])
        //         : searchFiltered
        //     result = dateFiltered
        // } else if (tagFilter.value && searchTerm === "") {
        //     dateFiltered = startDate && endDate
        //         ? tagFiltered.reduce((accumulator: RGMTSI.Quotation[], currentvalue) => {
        //             if (currentvalue.created_at >= startDate && currentvalue.created_at <= endDate) {
        //                 accumulator.push(currentvalue)
        //             }
        //             return accumulator
        //         }, [])
        //         : tagFiltered
        //     result = dateFiltered
        // } else {
            dateFiltered = startDate && endDate
                ? quotations.reduce((accumulator: RGMTSI.Quotation[], currentvalue) => {
                    console.log({
                        created_at: currentvalue.created_at,
                        start: startDate,
                        end: endDate
                    })
                    if (currentvalue.created_at >= startDate && currentvalue.created_at <= endDate) {
                        accumulator.push(currentvalue)
                    }
                    return accumulator
                }, [])
                : quotations
            result = dateFiltered
        // }
        console.log({
            start: start?.toString(),
            end: end?.toString()
        })
    }

    let db: IDBDatabase,
        quotations: RGMTSI.Quotation[] = [],
        searchTerm = "",
        searchFiltered: RGMTSI.Quotation[] = [],
        tagFiltered: RGMTSI.Quotation[] = [],
        dateFiltered: RGMTSI.Quotation[] = [],
        tags: string[] = [],
        cacheData: RGMTSI.Quotation[] = [],
        result: RGMTSI.Quotation[] = [];
    let tagFilter: HTMLSelectElement;
    let start: DateValue | undefined,
        end: DateValue | undefined;

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
                created_at: new Date('2024-05-27')
            },
            {
                id: uid.rnd(),
                company: 'Universal Robina',
                tags: ['Mixing Equipment', 'Freezer'],
                created_at: new Date('2024-05-28')
            },
            {
                id: uid.rnd(),
                company: 'Goldilocks',
                tags: ['Baking Equipment', 'Freezer'],
                created_at: new Date('2024-05-28')
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

        window.indexedDB.deleteDatabase('RGMTSI-demo')

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

<main class="bg-slate-300 text-slate-800 px-4 py-6 space-y-6">
    <div class="space-y-6">
        <h1 class="text-2xl">RGMTSI - Proof of concept for cloud-based file management</h1>
        <p class="max-w-[60ch] text-pretty">This demo showcases core features of the proposed cloud-based application. This is just a propotype and does not reflect the final product. Right now the app can only do the following:</p>
        <ul class="list-disc pl-8">
            <li>Filter using a combination of company name and tag</li>
            <li>List documents that are created within a date range. Note: This feature is currently separate from search and tag filter.</li>
            <li>Linking to a document for viewing, try clicking one of the items.</li>
        </ul>
        <p class="max-w-[60ch] text-pretty">There are many ways to query for document, we can store details such as contact person or the related equipment name and model as reference.</p>
    </div>

    <div class="flex flex-col xl:flex-row gap-4">
        <!-- xl:w-3/12 -->
        <form class="space-y-2">
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

            <div>Filter by date range</div>
            <div class="flex justify-center xl:justify-start">
                <DateRange bind:start bind:end on:change={filterByDate} />
            </div>
        </form>

        <div class="flex-grow space-y-4">
            {#each result as q}
                <!-- hour12: true, hour: '2-digit', minute: '2-digit' -->
                <a target="_blank" class="block" href="https://docs.google.com/document/d/1Cdjh8godvy4azmnmkIUbE5hW56rXMIvD_ORMg1O5Gm8/edit?usp=sharing">
                    <div class="px-4 py-3.5 bg-gray-50 rounded-lg space-y-2">
                        <div>{ q.company }</div>
                        <div class="flex flex-wrap gap-2">
                            {#each q.tags as tag}
                                <span class="text-sm bg-sky-700 text-white rounded px-1 py-0.5">{ tag }</span>
                            {/each}
                        </div>
                        <span class="block text-xs">Created at { q.created_at.toLocaleString('en-CA', {timeZone: 'Asia/Manila', year: 'numeric', month: 'numeric', day: 'numeric'}).toUpperCase().replaceAll(/(,)|([.])/g, '') }</span>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</main>

<style>
    select {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    }
</style>
