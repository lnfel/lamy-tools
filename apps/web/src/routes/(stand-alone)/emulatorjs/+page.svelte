<script lang="ts">
	import { browser } from "$app/environment"
    import { ThemeToggle } from "@repo/ui"
    import type { Theme } from "@repo/ui"
    import type { ComponentEvents } from 'svelte'

    let defaultChecked: boolean

    if (browser) {
        defaultChecked = localStorage.getItem('lamy:theme') === 'dark' ? true : false
    }

    /**
     * If changing the delay for setTimeout, please change delay-500 class inside ThemeToggle as well
     */
    function themeSwitch(event: ComponentEvents<ThemeToggle>['toggle']) {
        // setTimeout(() => {
        //     localStorage.setItem('lamy:theme', event.detail)
        //     localStorage.getItem('lamy:theme') === 'dark'
        //         ? document.body.classList.add('dark')
        //         : document.body.classList.remove('dark')
        // }, 500)
    }
</script>

<main class="px-4 py-6 text-slate-800 dark:text-white space-y-4">
    <header class="flex items-center justify-between">
        <h1 class="text-3xl">EmulatorJS</h1>
        <nav></nav>
        <ThemeToggle on:toggle={themeSwitch} bind:defaultChecked />
    </header>

    <p>Play nostalgic retro games from the browser, anytime, anywhere.</p>

    <div class="grid md:grid-cols-3">
        <a href="/emulatorjs/play?game=legend-of-zelda-a-link-to-the-past-snes" class="flex flex-col items-center gap-4">
            <img src="https://www.zeldadungeon.net/wp-content/uploads/2014/02/Link-to-the-Past-logo-e1627117273569.png" alt="The Legend of Zelda: A link to the past - SNES" class="h-56 object-contain">
            <span>Legend of Zelda: A link to the past - SNES</span>
        </a>

        <a href="/emulatorjs/play?game=legend-of-zelda-a-link-to-the-past-and-four-swords-gba" class="flex flex-col items-center gap-4">
            <img src="https://assets-prd.ignimgs.com/2022/02/28/fourswordslttp-1646083029688.jpg?width=300&crop=1%3A1%2Csmart&auto=webp" alt="The Legend of Zelda: A link to the past and Four Swords - GBA" class="h-56 object-contain">
            <span>Legend of Zelda: A link to the past and Four Swords - GBA</span>
        </a>

        <a href="/emulatorjs/play?game=secret-of-mana-snes" class="flex flex-col items-center gap-4">
            <img src="https://m.media-amazon.com/images/M/MV5BMDgzOWM1ZDYtYjYxNi00MGZkLTkwZGMtNzAxNjU1MmQ4N2U2XkEyXkFqcGdeQXVyMTgwNDM0Nzc0._V1_FMjpg_UX1200_.jpg" alt="Secret of Mana - SNES" class="h-56 object-contain">
            <span>Secret of Mana - SNES</span>
        </a>
    </div>
</main>
