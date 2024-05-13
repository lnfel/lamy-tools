<script>
	import '$lib/app.css'
</script>

<header class="px-4 py-6">
    <ul class="space-y-4">
        <li>
            <a href="/" class="px-2 py-1 text-indigo-500 outline-none hover:underline focus:underline">
                Home
            </a>
        </li>
        <li>
            <a href="/eden-treaty/get-image" class="px-2 py-1 text-indigo-500 outline-none hover:underline focus:underline">
                Image test
            </a>
        </li>
        <li>
            <a href="/eden-treaty/upload" class="px-2 py-1 text-indigo-500 outline-none hover:underline focus:underline">
                Upload test
            </a>
        </li>
        <li>
            <a href="/image/convert" class="px-2 py-1 text-indigo-500 outline-none hover:underline focus:underline">
                Convert Image
            </a>
        </li>
    </ul>
</header>

<slot />
